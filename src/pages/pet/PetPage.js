/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { petDetails, deletePet } from '../../actions/petActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const PetPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const petInfo = useSelector((state) => state.petInfo)
    const { loading, error, pet } = petInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // const petDelete = useSelector((state) => state.petDelete)
    // const { success } = petDelete

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(petDetails(id))
        }
    }, [dispatch, id, userInfo, navigate])

    const handleDelete = () => {
        dispatch(deletePet(id))

        navigate('/profile/pets')
    }

    return (
        <section className="pet-section">
            <div className="mb-5 ms-5">
                <Link to="/profile/pets" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="pet-container">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                <div className="pet-item d-flex flex-wrap gap-5 mt-5">
                    <div className="pet-item-img d-flex align-items-center justify-content-center bg-white">
                        <img src={pet.photo} alt={pet.name} />
                    </div>
                    <div className="pet-item-info">
                        <p className="pet-info">{`${pet.name}, ${pet.age}, ${pet.place}`}</p>
                        <p className="pet-about">{pet.about}</p>
                    </div>

                    {userInfo._id === pet.user ? (
                        <div className="pet-buttons-container">
                            <Button href={`/pet/${pet._id}/edit`}>Edit</Button>
                            <Button type="button" onClick={() => handleDelete(pet._id)}>
                                Delete
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    )
}

export default PetPage
