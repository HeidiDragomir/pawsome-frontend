/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const CardQuestion = ({ question }) => {
    return (
        // eslint-disable-next-line no-underscore-dangle
        <>
            <div className="card-img d-flex justify-content-center align-items-center">
                <Link className="card-item" to={`/question/${question._id}`}>
                    <img src={question.photo} alt="question" />
                </Link>
            </div>

            <p className="card-title">Title: {question.title}</p>
            <p className="card-description">Description: {question.description}</p>
        </>
    )
}

export default CardQuestion
