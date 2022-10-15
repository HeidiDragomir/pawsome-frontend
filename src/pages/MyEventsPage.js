/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyEvents } from '../actions/eventActions'
import CardEvent from '../components/card/CardEvent'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const MyEventsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const eventMyList = useSelector((state) => state.eventMyList)
    const { loading, error, events } = eventMyList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyEvents())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    return (
        <section className="events-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="events-container">
                <Button type="button" href="/event/create">
                    Create
                </Button>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <div className="events">
                    {events.map((event) => (
                        <CardEvent key={event._id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyEventsPage
