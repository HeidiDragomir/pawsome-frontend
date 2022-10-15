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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const eventCreate = useSelector((state) => state.eventCreate)
    const { loading, error, success } = eventCreate

    // const eventInfo = useSelector((state) => state.eventInfo)
    // const { event } = eventInfo

    useEffect(() => {
        if (success) {
            dispatch({ type: EVENT_CREATE_RESET })
            navigate('/profile/events')
        }
    }, [success, navigate, dispatch])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(createEvent(title, photo, description))
    }

    return (
        <section className="section-event-create">
            <div className="mb-5 ms-5">
                <Link to="/profile/events" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="event-edit-center">
                <h2>Create Event</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add event title"
                            required
                        />
                        <input
                            id="photo"
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Add event photo"
                            required
                        />
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add event description"
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

export default EventCreatePage
