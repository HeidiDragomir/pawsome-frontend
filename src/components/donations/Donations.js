import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardDonation from '../card/CardDonation'
import Loader from '../loader/Loader'
import Message from '../message/Message'

import { listDonations } from '../../actions/donationActions'

// eslint-disable-next-line react/function-component-definition
const Donations = () => {
    const dispatch = useDispatch()

    const donationList = useSelector((state) => state.donationList)
    const { loading, error, donations } = donationList

    useEffect(() => {
        dispatch(listDonations())
    }, [dispatch])

    return (
        <section className="donations-section">
            <div className="donations-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <div className="donations">
                    {donations.map((donation) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <CardDonation key={donation._id} donation={donation} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Donations
