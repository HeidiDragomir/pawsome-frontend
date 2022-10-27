import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardDonation from '../components/card/CardDonation'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import { listDonations } from '../actions/donationActions'
import './cardsPage.css'

// eslint-disable-next-line react/function-component-definition
const DonationsPage = () => {
    const dispatch = useDispatch()

    const donationList = useSelector((state) => state.donationList)
    const { loading, error, donations } = donationList

    useEffect(() => {
        dispatch(listDonations())
    }, [dispatch])

    return (
        <section className="cards-section">
            <div className="cards-container">
                {!loading && donations.length === 0 && (
                    <h4 className="text-center">Donation not found.</h4>
                )}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                {donations.map((donation) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <CardDonation key={donation._id} donation={donation} />
                ))}
            </div>
        </section>
    )
}

export default DonationsPage
