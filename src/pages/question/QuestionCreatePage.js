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
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const questionCreate = useSelector((state) => state.questionCreate)
    const { loading, error, success } = questionCreate

    // const questionInfo = useSelector((state) => state.questionInfo)
    // const { question } = questionInfo

    useEffect(() => {
        if (success) {
            dispatch({ type: QUESTION_CREATE_RESET })
            navigate('/profile/questions')
        }
    }, [success, navigate, dispatch])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(createQuestion(title, photo, description))
    }

    return (
        <section className="section-question-create">
            <div className="mb-5 ms-5">
                <Link to="/profile/questions" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="question-edit-center">
                <h2>Create Question</h2>
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
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default QuestionCreatePage
