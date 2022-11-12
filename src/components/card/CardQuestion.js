/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import './card.css'

// eslint-disable-next-line react/function-component-definition
const CardQuestion = ({ question }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <Link className="card h-100 text-decoration-none" to={`/question/${question._id}`}>
            <div className="card-img">
                <img src={question.photo} width="25vh" height="20vh" alt="question" />
            </div>
            <p className="card-title fs-5 fw-bold">{question.title}</p>
            <p className="card-description-createdBy">
                created by <span className="fst-italic">{question.name}</span>
            </p>
            <p className="card-description fs-6">{question.description}</p>
        </Link>
    )
}

export default CardQuestion
