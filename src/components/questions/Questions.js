import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardQuestion from '../card/CardQuestion'
import Loader from '../loader/Loader'
import Message from '../message/Message'

import { listQuestions } from '../../actions/questionActions'

// eslint-disable-next-line react/function-component-definition
const Questions = () => {
    const dispatch = useDispatch()

    const questionList = useSelector((state) => state.questionList)
    const { loading, error, questions } = questionList

    useEffect(() => {
        dispatch(listQuestions())
    }, [dispatch])

    return (
        <section className="questions-section">
            <div className="questions-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <div className="questions">
                    {questions.map((question) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <CardQuestion key={question._id} question={question} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Questions
