/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyEvents } from '../actions/eventActions'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import './cardsPage.css'
import CardEvent from '../components/card/CardEvent'

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
        <section className="cards-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="events-container d-flex align-items-center justify-content-center mb-5">
                <Button type="button" className="btn-main-color" href="/event/create">
                    Add
                </Button>
            </div>
            <div className="cards-container">
                {!loading && events.length === 0 && <h2>Nothing found.</h2>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                {events.map((event) => (
                    <CardEvent key={event._id} event={event} />
                ))}
            </div>
        </section>
    )
}

export default MyEventsPage
