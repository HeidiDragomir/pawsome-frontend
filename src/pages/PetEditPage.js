/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { petDetails, updatePet } from '../actions/petActions'
import { PET_UPDATE_RESET } from '../actions/types'

// eslint-disable-next-line react/function-component-definition
const PetEditPage = () => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)
    const [size, setSize] = useState('')
    const [about, setAbout] = useState('')
    const [photo, setPhoto] = useState('')
    const [place, setPlace] = useState('')

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
            navigate('/profile/pets')
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

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePet({ _id: id, name, gender, age, size, about, photo, place }))
        navigate('/profile/pets')
    }

    return (
        <section className="section-pet-edit">
            <div className="mb-5 ms-5">
                <Link to="/profile/pets" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="pet-edit-center">
                <h2>Update Pet</h2>
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
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default PetEditPage
