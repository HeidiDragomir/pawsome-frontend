import { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createEvent } from '../../actions/eventActions'
import { EVENT_CREATE_RESET } from '../../actions/types'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const EventCreatePage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const eventCreate = useSelector((state) => state.eventCreate)
    const { loading, error, success } = eventCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: EVENT_CREATE_RESET })
        }
    }, [success, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createEvent(title, photo, description))
        setMessage('Event created.')
        setTimeout(() => {
            navigate('/profile/events')
        }, 2000)
    }

    return (
        <section className="event-create-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/events" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="event-create-container form-container bg-white rounded-5 border">
                <h2 className="my-4">Add Event Info</h2>
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
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EventCreatePage
