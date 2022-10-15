import { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createVolunteer } from '../../actions/volunteerActions'
import { VOLUNTEER_CREATE_RESET } from '../../actions/types'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const VolunteerCreatePage = () => {
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const volunteerCreate = useSelector((state) => state.volunteerCreate)
    const { loading, error, success } = volunteerCreate

    // const volunteerInfo = useSelector((state) => state.volunteerInfo)
    // const { volunteer } = volunteerInfo

    useEffect(() => {
        if (success) {
            dispatch({ type: VOLUNTEER_CREATE_RESET })
            navigate('/profile/volunteers')
        }
    }, [success, navigate, dispatch])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(createVolunteer(title, photo, description))
    }

    return (
        <section className="section-volunteer-create">
            <div className="mb-5 ms-5">
                <Link to="/profile/volunteers" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="volunteer-edit-center">
                <h2>Create Volunteer</h2>
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
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default VolunteerCreatePage
