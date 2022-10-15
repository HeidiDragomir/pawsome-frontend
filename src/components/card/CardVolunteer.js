/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const CardVolunteer = ({ volunteer }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <>
            <div className="card-img d-flex justify-content-center align-items-center">
                <Link className="card-item" to={`/volunteer/${volunteer._id}`}>
                    <img src={volunteer.photo} alt="volunteer" />
                </Link>
            </div>

            <p className="card-title">Title: {volunteer.title}</p>
            <p className="card-description">Description: {volunteer.description}</p>
        </>
    )
}

export default CardVolunteer
