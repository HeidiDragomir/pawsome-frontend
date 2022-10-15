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

    // const donationDelete = useSelector((state) => state.donationDelete)
    // const { success } = donationDelete

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
        <section className="donation-section">
            <div className="mb-5 ms-5">
                <Link to="/profile/donations" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="donation-container">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                <div className="donation-item d-flex flex-wrap gap-5 mt-5">
                    <div className="donation-item-img d-flex align-items-center justify-content-center bg-white">
                        <img src={donation.photo} alt={donation.title} />
                    </div>
                    <div className="donation-item-info">
                        <p className="donation-info">{donation.title}</p>
                        <p className="donation-about">{donation.description}</p>
                    </div>

                    {userInfo._id === donation.user ? (
                        <div className="donation-buttons-container">
                            <Button href={`/donation/${donation._id}/edit`}>Edit</Button>
                            <Button type="button" onClick={() => handleDelete(donation._id)}>
                                Delete
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    )
}

export default DonationPage
