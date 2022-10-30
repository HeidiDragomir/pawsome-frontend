/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { BiDonateHeart } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import {
    donationDetails,
    deleteDonation,
    createDonationParticipant,
} from '../../actions/donationActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const DonationPage = () => {
    const [wanted, setWanted] = useState(false)
    const [message, setMessage] = useState('')
    const [messageDel, setMessageDel] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const donationInfo = useSelector((state) => state.donationInfo)
    const { loading, error, donation } = donationInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!donation || donation._id !== id) {
            dispatch(donationDetails(id))
        } else {
            setWanted(true)
        }
    }, [dispatch, id, userInfo, navigate, donation, wanted])

    const handleDelete = () => {
        dispatch(deleteDonation(id))
        setMessageDel('Donation deleted.')
        setTimeout(() => {
            navigate('/profile/donations')
        }, 2000)
    }

    const handleOnClick = () => {
        dispatch(createDonationParticipant(id))
        setMessage('Please contact us for more info!')
        // setTimeout(() => {
        //     // eslint-disable-next-line no-undef
        //     window.location.reload()
        // }, 1500)
    }

    return (
        <section className="donation-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/donations" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            {userInfo ? (
                <div className="donation-item form-container bg-white rounded-5 border">
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                    {message && <Message variant="success">{message}</Message>}
                    {messageDel && <Message variant="danger">{messageDel}</Message>}
                    <div className="donation-item-img d-flex flex-column align-items-center justify-content-center bg-white">
                        <img src={donation.photo} alt={donation.title} />
                        <div className="my-3 d-flex align-items-center justify-content-center gap-3">
                            {console.log(wanted)}
                            {wanted && userInfo._id !== donation.user && (
                                <Button onClick={handleOnClick} className="btn-adopt">
                                    <BiDonateHeart className="fs-4" />
                                </Button>
                            )}
                            {console.log(wanted)}
                        </div>
                    </div>
                    <div className="donation-item-info">
                        <h2 className="event-info mt-5 mb-3 fw-bold">{donation.title}</h2>
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
            ) : (
                <Navigate to="/login" />
            )}
        </section>
    )
}

export default DonationPage
