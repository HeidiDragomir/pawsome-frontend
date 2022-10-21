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
        <section className="pet-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>

            <div className="pet-item form-container bg-white rounded-5 border">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                <div className="pet-item-img d-flex align-items-center justify-content-center bg-white">
                    <img src={pet.photo} alt={pet.name} />
                </div>
                <div className="pet-item-info">
                    <h2 className="pet-name mt-5 mb-3 fw-bold">{pet.name}</h2>
                    <p className="pet-info">{`${pet.age} year/s - ${pet.gender}`}</p>
                    <p className="pet-info2">{`${pet.name} is a ${pet.size} ball of joy waiting to meet you in ${pet.place}.`}</p>
                    <p className="pet-about">
                        <u>More info about {pet.name}:</u> {pet.about}
                    </p>
                    <p className="pet-about">
                        <u>Info about us:</u>
                    </p>
                </div>

                {userInfo._id === pet.user ? (
                    <div className="pet-buttons-container">
                        <Button
                            className="fw-bold"
                            variant="success"
                            type="button"
                            href={`/pet/${pet._id}/edit`}
                        >
                            Edit
                        </Button>
                        <Button
                            className="mx-3 fw-bold"
                            variant="danger"
                            type="button"
                            onClick={() => handleDelete(pet._id)}
                        >
                            Delete
                        </Button>
                    </div>
                ) : null}
            </div>
        </section>
    )
}

export default PetPage
