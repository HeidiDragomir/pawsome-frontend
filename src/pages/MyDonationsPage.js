/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyDonations } from '../actions/donationActions'
import CardDonation from '../components/card/CardDonation'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import './cardsPage.css'

// eslint-disable-next-line react/function-component-definition
const MyDonationsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const donationMyList = useSelector((state) => state.donationMyList)
    const { loading, error, donations } = donationMyList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyDonations())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    return (
        <section className="cards-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="donations-container d-flex align-items-center justify-content-center mb-5">
                <Button type="button" className="btn-main-color" href="/donation/create">
                    Add
                </Button>
            </div>
            <div className="cards-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {donations.length === 0 && <h2>Nothing found.</h2>}
                {donations.map((donation) => (
                    <CardDonation key={donation._id} donation={donation} />
                ))}
            </div>
        </section>
    )
}

export default MyDonationsPage
