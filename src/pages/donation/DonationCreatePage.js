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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const donationCreate = useSelector((state) => state.donationCreate)
    const { loading, error, success } = donationCreate

    // const donationInfo = useSelector((state) => state.donationInfo)
    // const { donation } = donationInfo

    useEffect(() => {
        if (success) {
            dispatch({ type: DONATION_CREATE_RESET })
            navigate('/profile/donations')
        }
    }, [success, navigate, dispatch])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(createDonation(title, photo, description))
    }

    return (
        <section className="section-donation-create">
            <div className="mb-5 ms-5">
                <Link to="/profile/donations" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="donation-edit-center">
                <h2>Create Donation</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add donation title"
                            required
                        />
                        <input
                            id="photo"
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Add donation photo"
                            required
                        />
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add donation description"
                            required
                        />
                    </div>
                    <button className="btn-black w-100" type="submit">
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default DonationCreatePage
