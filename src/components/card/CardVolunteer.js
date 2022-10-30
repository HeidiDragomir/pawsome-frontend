/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import './card.css'

// eslint-disable-next-line react/function-component-definition
const CardVolunteer = ({ volunteer }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <Link className="card h-100 text-decoration-none" to={`/volunteer/${volunteer._id}`}>
            <div className="card-img">
                <img src={volunteer.photo} alt="volunteer" />
            </div>
            <p className="card-title fs-5 fw-bold">{volunteer.title}</p>
            <p className="card-description-createdBy">
                created by <span className="fst-italic">{volunteer.name}</span>
            </p>
            <p className="card-description fs-6 border-bottom pb-4">{volunteer.description}</p>
            {volunteer.participants.length > 0 && (
                <div className="mx-3">
                    {volunteer.participants.map((participant) => (
                        <p key={participant._id} className="link-black card-items">
                            <span className="card-items-name">{participant.name}</span> checked
                        </p>
                    ))}
                </div>
            )}
        </Link>
    )
}

export default CardVolunteer
