import { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createQuestion } from '../../actions/questionActions'
import { QUESTION_CREATE_RESET } from '../../actions/types'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const QuestionCreatePage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyccpkqVagH-8Pbq0r3-fCJz20h_S92K2rFQ&usqp=CAU'
    )
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const questionCreate = useSelector((state) => state.questionCreate)
    const { loading, error, success } = questionCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: QUESTION_CREATE_RESET })
        }
    }, [success, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createQuestion(title, photo, description))
        setMessage('Question created.')
        setTimeout(() => {
            navigate('/profile/questions')
        }, 2000)
    }

    return (
        <section className="question-create-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/questions" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="question-create-container form-container bg-white rounded-5 border">
                <h2 className="my-4">Add Question</h2>
                {message && <Message variant="success">{message}</Message>}
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

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
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default QuestionCreatePage
