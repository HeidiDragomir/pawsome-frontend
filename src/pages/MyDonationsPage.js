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
        <section className="donations-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="donations-container">
                <Button type="button" href="/donation/create">
                    Create
                </Button>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <div className="donations">
                    {donations.map((donation) => (
                        <CardDonation key={donation._id} donation={donation} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyDonationsPage
