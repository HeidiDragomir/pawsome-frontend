import { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createDonation } from '../../actions/donationActions'
import { DONATION_CREATE_RESET } from '../../actions/types'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const DonationCreatePage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const donationCreate = useSelector((state) => state.donationCreate)
    const { loading, error, success } = donationCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: DONATION_CREATE_RESET })
        }
    }, [success, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createDonation(title, photo, description))
        setMessage('Donation created.')
        setTimeout(() => {
            navigate('/profile/donations')
        }, 2000)
    }

    return (
        <section className="donation-create-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/donations" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="donation-create-container form-container bg-white rounded-5 border">
                <h2 className="my-4">Add Donation Info</h2>
                {message && <Message variant="success">{message}</Message>}
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            required
                        />
                        <input
                            className="form-control"
                            id="photo"
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Photo"
                            required
                        />
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />
                    </div>
                    <button className="btn-form mt-3 w-100" type="submit">
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default DonationCreatePage
