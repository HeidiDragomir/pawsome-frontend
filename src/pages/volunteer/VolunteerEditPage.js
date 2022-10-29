/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { volunteerDetails, updateVolunteer } from '../../actions/volunteerActions'
import { VOLUNTEER_UPDATE_RESET } from '../../actions/types'

// eslint-disable-next-line react/function-component-definition
const VolunteerEditPage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const volunteerInfo = useSelector((state) => state.volunteerInfo)
    const { loading, error, volunteer } = volunteerInfo

    const volunteerUpdate = useSelector((state) => state.volunteerUpdate)
    const { success } = volunteerUpdate

    useEffect(() => {
        if (success) {
            dispatch({ type: VOLUNTEER_UPDATE_RESET })
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!volunteer.title || volunteer._id !== id) {
                dispatch(volunteerDetails(id))
            } else {
                setTitle(volunteer.title)
                setPhoto(volunteer.photo)
                setDescription(volunteer.description)
            }
        }
    }, [navigate, success, dispatch, id, volunteer])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateVolunteer({ _id: id, title, photo, description }))
        setMessage('Updated.')
        setTimeout(() => {
            navigate('/profile/volunteers')
        }, 2000)
    }

    return (
        <section className="volunteer-edit-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/volunteers" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="volunteer-edit-container form-container bg-white rounded-5 border">
                <h2>Update Volunteer Info</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="success">{message}</Message>}
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
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default VolunteerEditPage
