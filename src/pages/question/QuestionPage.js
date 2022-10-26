/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import moment from 'moment'
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { questionDetails, deleteQuestion, createAnswer } from '../../actions/questionActions'
import { QUESTION_CREATE_ANSWER_RESET } from '../../actions/types'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const QuestionPage = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const questionInfo = useSelector((state) => state.questionInfo)
    const { loading, error, question } = questionInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const questionAnswerCreate = useSelector((state) => state.questionAnswerCreate)
    const { success: successQuestionAnswer, error: errorQuestionAnswer } = questionAnswerCreate

    useEffect(() => {
        if (successQuestionAnswer) {
            // eslint-disable-next-line no-alert, no-undef
            // alert('Your Answer is posted.')
            setText('')
            dispatch({ type: QUESTION_CREATE_ANSWER_RESET })
        }

        dispatch(questionDetails(id))
    }, [dispatch, id, userInfo, successQuestionAnswer])

    const handleDelete = () => {
        dispatch(deleteQuestion(id))

        navigate('/profile/questions')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createAnswer(id, { text }))
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
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <div className="question-item-img d-flex align-items-center justify-content-center bg-white">
                            <img src={question.photo} alt={question.title} />
                        </div>
                        <div className="question-item-info">
                            <p className="question-info mt-5 mb-3 fw-bold">
                                {question.title}{' '}
                                <span className="fw-italic">posted by {question.name}</span>
                            </p>
                            <p className="question-about">{question.description}</p>
                        </div>

                        {userInfo._id === question.user && (
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
                        )}

                        <div className="row my-5">
                            <div className="row-md-6">
                                <h3 className="mb-3">Answers</h3>
                                {question.answers.length === 0 && <Message>No answers.</Message>}

                                {question.answers.map((answer) => (
                                    <div
                                        key={answer._id}
                                        className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                                    >
                                        <strong>{answer.name}</strong>
                                        <p>{moment(question.createdAt).calendar()}</p>
                                        <div className="alert alert-info mt-3">{answer.text}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="row-md-6">
                                <h3>Write An Answer</h3>

                                <div className="my-4">
                                    {errorQuestionAnswer && (
                                        <Message variant="danger">{errorQuestionAnswer}</Message>
                                    )}

                                    {userInfo ? (
                                        <Form onSubmit={onSubmit}>
                                            <Form.Group controlId="answer">
                                                <Form.Label>Answer</Form.Label>
                                                <Form.Control
                                                    className="answer-text-area"
                                                    as="textarea"
                                                    row="5"
                                                    value={text}
                                                    onChange={(e) => setText(e.target.value)}
                                                    required
                                                />
                                                <button type="submit" className="btn-black my-4">
                                                    Send
                                                </button>
                                            </Form.Group>
                                        </Form>
                                    ) : (
                                        <Message variant="dark">
                                            <Link className="" to="/login">
                                                Login
                                            </Link>{' '}
                                            to write an answer.
                                        </Message>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default QuestionPage
