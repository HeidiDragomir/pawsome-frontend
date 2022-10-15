/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const Card = ({ pet }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <>
            <div className="card-img d-flex justify-content-center align-items-center">
                <Link className="card-item" to={`/pet/${pet._id}`}>
                    <img src={pet.photo} alt="cute pet" />
                </Link>
            </div>

            <p className="card-name">Name: {pet.name}</p>
            <p className="card-age">Age: {pet.age}</p>
            <p className="card-place">Place: {pet.place}</p>
        </>
    )
}

export default Card
