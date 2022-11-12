import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CardQuestion from '../components/card/CardQuestion'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import { listQuestions } from '../actions/questionActions'
import './cardsPage.css'

// eslint-disable-next-line react/function-component-definition
const QuestionsPage = () => {
    const dispatch = useDispatch()

    const questionList = useSelector((state) => state.questionList)
    const { loading, error, questions } = questionList

    useEffect(() => {
        dispatch(listQuestions())
    }, [dispatch])

    return (
        <section className="cards-section">
            <div className="m-5 ms-5">
                <Link to="/" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="cards-container">
                {!loading && questions.length === 0 && <h2>Nothing found.</h2>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                {questions.map((question) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <CardQuestion key={question._id} question={question} />
                ))}
            </div>
        </section>
    )
}

export default QuestionsPage
