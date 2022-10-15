/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
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
            navigate('/profile/questions')
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

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(updateQuestion({ _id: id, title, photo, description }))
        navigate('/profile/questions')
    }

    return (
        <section className="section-question-edit">
            <div className="mb-5 ms-5">
                <Link to="/profile/questions" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="question-edit-center">
                <h2>Update Question</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add question title"
                            required
                        />
                        <input
                            id="photo"
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Add question photo"
                            required
                        />
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add question description"
                            required
                        />
                    </div>
                    <button className="btn-black w-100" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default QuestionEditPage
