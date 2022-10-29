import { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createPet } from '../../actions/petActions'
import { PET_CREATE_RESET } from '../../actions/types'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const PetCreatePage = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)
    const [size, setSize] = useState('')
    const [about, setAbout] = useState('')
    const [photo, setPhoto] = useState('')
    const [place, setPlace] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const petCreate = useSelector((state) => state.petCreate)
    const { loading, error, success } = petCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: PET_CREATE_RESET })
        }
    }, [success, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createPet(name, gender, age, size, about, photo, place))
        setMessage('Pet created.')
        setTimeout(() => {
            navigate('/profile/pets')
        }, 2000)
    }

    return (
        <section className="pet-create-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile/pets" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="pet-create-container form-container bg-white rounded-5 border">
                <h2 className="my-4">Add Pet Info</h2>
                {message && <Message variant="success">{message}</Message>}
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

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
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default PetCreatePage
