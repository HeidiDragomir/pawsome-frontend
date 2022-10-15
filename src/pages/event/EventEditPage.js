/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { eventDetails, updateEvent } from '../../actions/eventActions'
import { EVENT_UPDATE_RESET } from '../../actions/types'

// eslint-disable-next-line react/function-component-definition
const EventEditPage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const eventInfo = useSelector((state) => state.eventInfo)
    const { loading, error, event } = eventInfo

    const eventUpdate = useSelector((state) => state.eventUpdate)
    const { success } = eventUpdate

    useEffect(() => {
        if (success) {
            dispatch({ type: EVENT_UPDATE_RESET })
            navigate('/profile/events')
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!event.title || event._id !== id) {
                dispatch(eventDetails(id))
            } else {
                setTitle(event.title)
                setPhoto(event.photo)
                setDescription(event.description)
            }
        }
    }, [navigate, success, dispatch, id, event])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(updateEvent({ _id: id, title, photo, description }))
        navigate('/profile/events')
    }

    return (
        <section className="section-event-edit">
            <div className="mb-5 ms-5">
                <Link to="/profile/events" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="event-edit-center">
                <h2>Update Event</h2>
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
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EventEditPage
