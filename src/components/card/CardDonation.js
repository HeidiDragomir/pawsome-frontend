/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import './card.css'

// eslint-disable-next-line react/function-component-definition
const CardDonation = ({ donation }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <Link className="card h-100 text-decoration-none" to={`/donation/${donation._id}`}>
            <div className="card-img">
                <img src={donation.photo} alt="donation" />
            </div>
            <p className="card-title fs-5 fw-bold">{donation.title}</p>
            <p className="card-description fs-6">{donation.description}</p>
        </Link>
    )
}

export default CardDonation
