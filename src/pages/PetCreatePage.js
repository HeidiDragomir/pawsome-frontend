import { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createPet } from '../actions/petActions'
import { PET_CREATE_RESET } from '../actions/types'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const PetCreatePage = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)
    const [size, setSize] = useState('')
    const [about, setAbout] = useState('')
    const [photo, setPhoto] = useState('')
    const [place, setPlace] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const petCreate = useSelector((state) => state.petCreate)
    const { loading, error, success } = petCreate

    // const petInfo = useSelector((state) => state.petInfo)
    // const { pet } = petInfo

    useEffect(() => {
        if (success) {
            dispatch({ type: PET_CREATE_RESET })
            navigate('/profile/pets')
        }
    }, [success, navigate, dispatch])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(createPet(name, gender, age, size, about, photo, place))
    }

    return (
        <section className="section-pet-create">
            <div className="mb-5 ms-5">
                <Link to="/profile/pets" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="pet-edit-center">
                <h2>Create Pet</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Add name"
                            required
                        />
                        <input
                            id="gender"
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Add pet gender"
                            required
                        />
                        <input
                            id="age"
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Add pet age"
                            required
                        />
                        <input
                            id="size"
                            type="text"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            placeholder="Add pet size"
                            required
                        />
                        <textarea
                            id="about"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="Add pet about"
                            required
                        />
                        {/* <input
                    id="about"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Add pet about"
                    required
                /> */}
                        <input
                            id="photo"
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Add pet photo"
                            required
                        />
                        <input
                            id="place"
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            placeholder="Add pet place"
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

export default PetCreatePage
