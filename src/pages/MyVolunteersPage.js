/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyVolunteers } from '../actions/volunteerActions'
import CardVolunteer from '../components/card/CardVolunteer'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import './cardsPage.css'

// eslint-disable-next-line react/function-component-definition
const MyVolunteersPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const volunteerMyList = useSelector((state) => state.volunteerMyList)
    const { loading, error, volunteers } = volunteerMyList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyVolunteers())
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
            <div className="volunteers-container d-flex align-items-center justify-content-center mb-5">
                <Button className="btn-main-color" type="button" href="/volunteer/create">
                    Add
                </Button>
            </div>
            <div className="cards-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {volunteers.length === 0 && <h2>Nothing found.</h2>}
                {volunteers.map((volunteer) => (
                    <CardVolunteer key={volunteer._id} volunteer={volunteer} />
                ))}
            </div>
        </section>
    )
}

export default MyVolunteersPage
