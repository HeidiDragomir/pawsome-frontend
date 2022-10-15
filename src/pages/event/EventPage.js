/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { eventDetails, deleteEvent } from '../../actions/eventActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const EventPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const eventInfo = useSelector((state) => state.eventInfo)
    const { loading, error, event } = eventInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // const eventDelete = useSelector((state) => state.eventDelete)
    // const { success } = eventDelete

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(eventDetails(id))
        }
    }, [dispatch, id, userInfo, navigate])

    const handleDelete = () => {
        dispatch(deleteEvent(id))

        navigate('/profile/events')
    }

    return (
        <section className="event-section">
            <div className="mb-5 ms-5">
                <Link to="/profile/events" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="event-container">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                <div className="event-item d-flex flex-wrap gap-5 mt-5">
                    <div className="event-item-img d-flex align-items-center justify-content-center bg-white">
                        <img src={event.photo} alt={event.title} />
                    </div>
                    <div className="event-item-info">
                        <p className="event-info">{event.title}</p>
                        <p className="event-about">{event.description}</p>
                    </div>

                    {userInfo._id === event.user ? (
                        <div className="event-buttons-container">
                            <Button href={`/event/${event._id}/edit`}>Edit</Button>
                            <Button type="button" onClick={() => handleDelete(event._id)}>
                                Delete
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    )
}

export default EventPage
