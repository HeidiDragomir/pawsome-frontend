/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyQuestions } from '../actions/questionActions'
import CardQuestion from '../components/card/CardQuestion'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import './cardsPage.css'

// eslint-disable-next-line react/function-component-definition
const MyQuestionsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const questionMyList = useSelector((state) => state.questionMyList)
    const { loading, error, questions } = questionMyList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyQuestions())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    return (
        <section className="cards-section">
            <div className="mb-5 ms-5">
                <Link to="/profile/questions" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="questions-container d-flex align-items-center justify-content-center mb-5">
                <Button className="btn-main-color" type="button" href="/question/create">
                    Add
                </Button>
            </div>
            <div className="cards-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {!loading && questions.length === 0 && <h2>Nothing found.</h2>}
                {questions.map((question) => (
                    <CardQuestion key={question._id} question={question} />
                ))}
            </div>
        </section>
    )
}

export default MyQuestionsPage
