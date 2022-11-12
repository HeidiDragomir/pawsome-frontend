/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { petDetails, updatePet } from '../../actions/petActions'
import { PET_UPDATE_RESET } from '../../actions/types'

// eslint-disable-next-line react/function-component-definition
const PetEditPage = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)
    const [size, setSize] = useState('')
    const [about, setAbout] = useState('')
    const [photo, setPhoto] = useState('')
    const [place, setPlace] = useState('')
    const [message, setMessage] = useState('')

    const { id } = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const petInfo = useSelector((state) => state.petInfo)
    const { loading, error, pet } = petInfo

    const petUpdate = useSelector((state) => state.petUpdate)
    const { success } = petUpdate

    useEffect(() => {
        if (success) {
            dispatch({ type: PET_UPDATE_RESET })
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!pet.name || pet._id !== id) {
                dispatch(petDetails(id))
            } else {
                setName(pet.name)
                setGender(pet.gender)
                setAge(pet.age)
                setSize(pet.size)
                setAbout(pet.about)
                setPhoto(pet.photo)
                setPlace(pet.place)
            }
        }
    }, [navigate, success, dispatch, id, pet])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePet({ _id: id, name, gender, age, size, about, photo, place }))
        setMessage('Pet updated.')
        setTimeout(() => {
            navigate('/profile/pets')
        }, 2000)
    }

    return (
        <section className="pet-edit-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/pets" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="pet-edit-container form-container bg-white rounded-5 border">
                <h2 className="my-4">Update Pet Info</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="success">{message}</Message>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                        <input
                            className="form-control"
                            id="gender"
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Gender"
                            required
                        />
                        <input
                            className="form-control"
                            id="age"
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Age"
                            required
                        />
                        <input
                            className="form-control"
                            id="size"
                            type="text"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            placeholder="Size"
                            required
                        />
                        <textarea
                            className="form-control"
                            id="about"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="More Info"
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
                        <input
                            className="form-control"
                            id="place"
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            placeholder="Place"
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

export default PetEditPage
