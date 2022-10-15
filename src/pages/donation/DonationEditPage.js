/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { donationDetails, updateDonation } from '../../actions/donationActions'
import { DONATION_UPDATE_RESET } from '../../actions/types'

// eslint-disable-next-line react/function-component-definition
const DonationEditPage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const donationInfo = useSelector((state) => state.donationInfo)
    const { loading, error, donation } = donationInfo

    const donationUpdate = useSelector((state) => state.donationUpdate)
    const { success } = donationUpdate

    useEffect(() => {
        if (success) {
            dispatch({ type: DONATION_UPDATE_RESET })
            navigate('/profile/donations')
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!donation.title || donation._id !== id) {
                dispatch(donationDetails(id))
            } else {
                setTitle(donation.title)
                setPhoto(donation.photo)
                setDescription(donation.description)
            }
        }
    }, [navigate, success, dispatch, id, donation])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(updateDonation({ _id: id, title, photo, description }))
        navigate('/profile/donations')
    }

    return (
        <section className="section-donation-edit">
            <div className="mb-5 ms-5">
                <Link to="/profile/donations" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="donation-edit-center">
                <h2>Update Donation</h2>
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
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default DonationEditPage
