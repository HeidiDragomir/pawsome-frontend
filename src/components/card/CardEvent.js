/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import './card.css'

// eslint-disable-next-line react/function-component-definition
const CardEvent = ({ event }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <Link className="card h-100 text-decoration-none" to={`/event/${event._id}`}>
            <div className="card-img">
                <img src={event.photo} alt="event" />
            </div>
            <p className="card-title fs-5 fw-bold">{event.title}</p>
            <p className="card-description fs-6">{event.description}</p>
            <p className="card-description fs-6">
                created by <span className="fst-italic">{event.name}</span>
            </p>
        </Link>
    )
}

export default CardEvent
