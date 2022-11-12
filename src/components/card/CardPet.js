/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import './card.css'

// eslint-disable-next-line react/function-component-definition
const CardPet = ({ pet }) => {
    return (
        <Link className="card h-100 text-decoration-none" to={`/pet/${pet._id}`}>
            <div className="card-img">
                <img src={pet.photo} alt="cute pet" width="25vh" height="20vh" />
            </div>
            {pet.isAdopted && (
                <p className="badge rounded-pill mx-3" style={{ background: '#fc8800' }}>
                    Adopted
                </p>
            )}
            {pet.isFostered && (
                <p className="badge rounded-pill mx-3" style={{ background: '#e75575' }}>
                    Fostered
                </p>
            )}
            {pet.isVirtualAdopted && (
                <p className="badge rounded-pill mx-3" style={{ background: '#35d8e1' }}>
                    Virtual Adopted
                </p>
            )}

            <p className="card-place fs-6">{pet.place}</p>
            <p className="card-title fs-5 fw-bold">{pet.name}</p>
            <p className="card-age fs-6">
                {pet.age} years, {pet.gender}
            </p>
        </Link>
    )
}

export default CardPet
