/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { MdOutlineEventNote } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
// import Confetti from 'react-confetti'
import { eventDetails, deleteEvent, createEventParticipant } from '../../actions/eventActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
// import { EVENT_CREATE_PARTICIPANT_RESET } from '../../actions/types'

const EventPage = () => {
    const [attended, setAttended] = useState(false)
    const [message, setMessage] = useState('')
    const [messageDel, setMessageDel] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const eventInfo = useSelector((state) => state.eventInfo)
    const { loading, error, event } = eventInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!event || event._id !== id) {
            dispatch(eventDetails(id))
        } else {
            setAttended(true)
        }
    }, [dispatch, id, userInfo, event, navigate, attended])

    const handleDelete = () => {
        dispatch(deleteEvent(id))
        setMessageDel('Event deleted.')
        setTimeout(() => {
            navigate('/profile/events')
        }, 2000)
    }

    const handleOnClick = () => {
        dispatch(createEventParticipant(id))
        setMessage('Perfect! We will see there!')
        setTimeout(() => {
            navigate('/events')
        }, 2000)
    }

    return (
        <section className="event-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/events" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            {userInfo ? (
                <div className="event-item form-container bg-white rounded-5 border">
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                    {message && <Message variant="success">{message}</Message>}
                    {messageDel && <Message variant="danger">{messageDel}</Message>}
                    <div className="event-item-img d-flex flex-column align-items-center justify-content-center bg-white">
                        <img src={event.photo} alt={event.title} />
                        <div className="my-3 d-flex align-items-center justify-content-center gap-3">
                            {attended && userInfo._id !== event.user && (
                                <Button onClick={handleOnClick} className="btn-adopt">
                                    <MdOutlineEventNote className="fs-4" /> Attend
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="event-item-info">
                        <h2 className="event-info mt-5 mb-3 fw-bold">{event.title}</h2>
                        <p className="event-about">{event.description}</p>
                    </div>

                    {userInfo._id === event.user ? (
                        <div className="event-buttons-container">
                            <Button
                                className="fw-bold"
                                variant="success"
                                type="button"
                                href={`/event/${event._id}/edit`}
                            >
                                Edit
                            </Button>
                            <Button
                                className="mx-3 fw-bold"
                                variant="danger"
                                type="button"
                                onClick={() => handleDelete(event._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ) : null}
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </section>
    )
}

export default EventPage
