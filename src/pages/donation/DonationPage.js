/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { donationDetails, deleteDonation } from '../../actions/donationActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const DonationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const donationInfo = useSelector((state) => state.donationInfo)
    const { loading, error, donation } = donationInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(donationDetails(id))
        }
    }, [dispatch, id, userInfo, navigate])

    const handleDelete = () => {
        dispatch(deleteDonation(id))

        navigate('/profile/donations')
    }

    return (
        <section className="donation-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/donations" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="donation-item form-container bg-white rounded-5 border">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <div className="donation-item-img d-flex align-items-center justify-content-center bg-white">
                    <img src={donation.photo} alt={donation.title} />
                </div>
                <div className="donation-item-info">
                    <p className="donation-info mt-5 mb-3 fw-bold">{donation.title}</p>
                    <p className="donation-about">{donation.description}</p>
                </div>

                {userInfo._id === donation.user ? (
                    <div className="donation-buttons-container">
                        <Button
                            className="fw-bold"
                            variant="success"
                            type="button"
                            href={`/donation/${donation._id}/edit`}
                        >
                            Edit
                        </Button>
                        <Button
                            className="mx-3 fw-bold"
                            variant="danger"
                            type="button"
                            onClick={() => handleDelete(donation._id)}
                        >
                            Delete
                        </Button>
                    </div>
                ) : null}
            </div>
        </section>
    )
}

export default DonationPage
