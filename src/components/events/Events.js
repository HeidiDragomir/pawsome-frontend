import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardEvent from '../card/CardEvent'
import Loader from '../loader/Loader'
import Message from '../message/Message'

import { listEvents } from '../../actions/eventActions'

// eslint-disable-next-line react/function-component-definition
const Events = () => {
    const dispatch = useDispatch()

    const eventList = useSelector((state) => state.eventList)
    const { loading, error, events } = eventList

    useEffect(() => {
        dispatch(listEvents())
    }, [dispatch])

    return (
        <section className="events-section">
            <div className="events-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <div className="events">
                    {events.map((event) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <CardEvent key={event._id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Events
