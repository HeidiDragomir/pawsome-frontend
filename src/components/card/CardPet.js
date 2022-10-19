/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import './card.css'

// eslint-disable-next-line react/function-component-definition
const Card = ({ pet }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle

        <Link className="card-item text-decoration-none" to={`/pet/${pet._id}`}>
            <div className="card-item-img d-flex justify-content-center align-items-center">
                <img src={pet.photo} alt="cute pet" />
            </div>
            <p className="card-item-place fs-6">{pet.place}</p>
            <p className="card-item-name fs-5 fw-bold">{pet.name}</p>
            <p className="card-item-age fs-6">
                {pet.age} years, {pet.gender}
            </p>
        </Link>
    )
}

export default Card
