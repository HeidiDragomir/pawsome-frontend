/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const CardDonation = ({ donation }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <>
            <div className="card-img d-flex justify-content-center align-items-center">
                <Link className="card-item" to={`/donation/${donation._id}`}>
                    <img src={donation.photo} alt="donation" />
                </Link>
            </div>

            <p className="card-title">Title: {donation.title}</p>
            <p className="card-description">Description: {donation.description}</p>
        </>
    )
}

export default CardDonation
