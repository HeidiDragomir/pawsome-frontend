import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardEvent from '../components/card/CardEvent'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import { listEvents } from '../actions/eventActions'
import './cardsPage.css'

// eslint-disable-next-line react/function-component-definition
const EventsPage = () => {
    const dispatch = useDispatch()

    const eventList = useSelector((state) => state.eventList)
    const { loading, error, events } = eventList

    useEffect(() => {
        dispatch(listEvents())
    }, [dispatch])

    return (
        <section className="cards-section">
            <div className="cards-container">
                {!loading && events.length === 0 && <h4 className="text-center">Nothing found.</h4>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                {events.map((event) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <CardEvent key={event._id} event={event} />
                ))}
            </div>
        </section>
    )
}

export default EventsPage
