/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { volunteerDetails, deleteVolunteer } from '../../actions/volunteerActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const VolunteerPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const volunteerInfo = useSelector((state) => state.volunteerInfo)
    const { loading, error, volunteer } = volunteerInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(volunteerDetails(id))
        }
    }, [dispatch, id, userInfo, navigate])

    const handleDelete = () => {
        dispatch(deleteVolunteer(id))

        navigate('/profile/volunteers')
    }

    return (
        <section className="volunteer-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/volunteers" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="volunteer-item form-container bg-white rounded-5 border">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <div className="volunteer-item-img d-flex align-items-center justify-content-center bg-white">
                    <img src={volunteer.photo} alt={volunteer.title} />
                </div>
                <div className="volunteer-item-info">
                    <p className="volunteer-info mt-5 mb-3 fw-bold">{volunteer.title}</p>
                    <p className="volunteer-about">{volunteer.description}</p>
                </div>

                {userInfo._id === volunteer.user ? (
                    <div className="volunteer-buttons-container">
                        <Button
                            className="fw-bold"
                            variant="success"
                            type="button"
                            href={`/volunteer/${volunteer._id}/edit`}
                        >
                            Edit
                        </Button>
                        <Button
                            className="mx-3 fw-bold"
                            variant="danger"
                            type="button"
                            onClick={() => handleDelete(volunteer._id)}
                        >
                            Delete
                        </Button>
                    </div>
                ) : null}
            </div>
        </section>
    )
}

export default VolunteerPage
