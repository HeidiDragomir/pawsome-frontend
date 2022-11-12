/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { questionDetails, updateQuestion } from '../../actions/questionActions'
import { QUESTION_UPDATE_RESET } from '../../actions/types'

// eslint-disable-next-line react/function-component-definition
const QuestionEditPage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const questionInfo = useSelector((state) => state.questionInfo)
    const { loading, error, question } = questionInfo

    const questionUpdate = useSelector((state) => state.questionUpdate)
    const { success } = questionUpdate

    useEffect(() => {
        if (success) {
            dispatch({ type: QUESTION_UPDATE_RESET })
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!question.title || question._id !== id) {
                dispatch(questionDetails(id))
            } else {
                setTitle(question.title)
                setPhoto(question.photo)
                setDescription(question.description)
            }
        }
    }, [navigate, success, dispatch, id, question])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateQuestion({ _id: id, title, photo, description }))
        setMessage('Question updated.')
        setTimeout(() => {
            navigate('/profile/questions')
        }, 2000)
    }

    return (
        <section className="question-edit-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/questions" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="question-edit-container form-container bg-white rounded-5 border">
                <h2>Update Question</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="success">{message}</Message>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            required
                        />
                        <input
                            className="form-control"
                            id="photo"
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Photo"
                            required
                        />
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />
                    </div>
                    <button className="btn-form mt-3 w-100" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default QuestionEditPage
