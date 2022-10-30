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
            <p className="card-description-createdBy">
                created by <span className="fst-italic">{event.name}</span>
            </p>
            <p className="card-description fs-6 border-bottom pb-4">{event.description}</p>

            {event.participants.length > 0 && (
                <div className="mx-3">
                    {event.participants.map((participant) => (
                        <p key={participant._id} className="link-black card-items">
                            <span className="card-items-name">{participant.name}</span> is coming
                        </p>
                    ))}
                </div>
            )}
        </Link>
    )
}

export default CardEvent
