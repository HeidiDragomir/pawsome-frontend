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
            navigate('/profile/volunteers')
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

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(updateVolunteer({ _id: id, title, photo, description }))
        navigate('/profile/volunteers')
    }

    return (
        <section className="section-volunteer-edit">
            <div className="mb-5 ms-5">
                <Link to="/profile/volunteers" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="volunteer-edit-center">
                <h2>Update Volunteer</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add volunteer title"
                            required
                        />
                        <input
                            id="photo"
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Add volunteer photo"
                            required
                        />
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add volunteer description"
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

export default VolunteerEditPage
