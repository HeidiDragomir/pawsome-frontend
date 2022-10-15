/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const CardEvent = ({ event }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <>
            <div className="card-img d-flex justify-content-center align-items-center">
                <Link className="card-item" to={`/event/${event._id}`}>
                    <img src={event.photo} alt="event" />
                </Link>
            </div>

            <p className="card-title">Title: {event.title}</p>
            <p className="card-description">Description: {event.description}</p>
        </>
    )
}

export default CardEvent
