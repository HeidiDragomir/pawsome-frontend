import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CardVolunteer from '../components/card/CardVolunteer'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import { listVolunteers } from '../actions/volunteerActions'
import './cardsPage.css'

// eslint-disable-next-line react/function-component-definition
const VolunteersPage = () => {
    const dispatch = useDispatch()

    const volunteerList = useSelector((state) => state.volunteerList)
    const { loading, error, volunteers } = volunteerList

    useEffect(() => {
        dispatch(listVolunteers())
    }, [dispatch])

    return (
        <section className="cards-section">
            <div className="m-5 ms-5">
                <Link to="/" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="cards-container">
                {!loading && volunteers.length === 0 && (
                    <h4 className="text-center">Nothing found.</h4>
                )}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                {volunteers.map((volunteer) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <CardVolunteer key={volunteer._id} volunteer={volunteer} />
                ))}
            </div>
        </section>
    )
}

export default VolunteersPage
