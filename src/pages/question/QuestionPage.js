/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { questionDetails, deleteQuestion } from '../../actions/questionActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const QuestionPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const questionInfo = useSelector((state) => state.questionInfo)
    const { loading, error, question } = questionInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(questionDetails(id))
        }
    }, [dispatch, id, userInfo, navigate])

    const handleDelete = () => {
        dispatch(deleteQuestion(id))

        navigate('/profile/questions')
    }

    return (
        <section className="question-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/questions" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="question-item form-container bg-white rounded-5 border">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <div className="question-item-img d-flex align-items-center justify-content-center bg-white">
                    <img src={question.photo} alt={question.title} />
                </div>
                <div className="question-item-info">
                    <p className="question-info mt-5 mb-3 fw-bold">{question.title}</p>
                    <p className="question-about">{question.description}</p>
                </div>

                {userInfo._id === question.user ? (
                    <div className="question-buttons-container">
                        <Button
                            className="fw-bold"
                            variant="success"
                            type="button"
                            href={`/question/${question._id}/edit`}
                        >
                            Edit
                        </Button>
                        <Button
                            className="mx-3 fw-bold"
                            variant="danger"
                            type="button"
                            onClick={() => handleDelete(question._id)}
                        >
                            Delete
                        </Button>
                    </div>
                ) : null}
            </div>
        </section>
    )
}

export default QuestionPage
