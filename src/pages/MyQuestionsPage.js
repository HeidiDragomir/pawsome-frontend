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
        <section className="questions-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="questions-container">
                <Button type="button" href="/question/create">
                    Create
                </Button>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <div className="questions">
                    {questions.map((question) => (
                        <CardQuestion key={question._id} question={question} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyQuestionsPage
