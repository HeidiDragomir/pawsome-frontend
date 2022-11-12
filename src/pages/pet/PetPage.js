/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AiOutlineHome } from 'react-icons/ai'
import { FaCouch } from 'react-icons/fa'
import { RiHandHeartLine } from 'react-icons/ri'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { petDetails, deletePet, updatePetToAdopted } from '../../actions/petActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const PetPage = () => {
    const [adopted, setAdopted] = useState(false)
    const [fostered, setFostered] = useState(false)
    const [virtual, setVirtual] = useState(false)
    const [message, setMessage] = useState('')
    const [messageAdopt, setMessageAdopt] = useState('')
    const [messageVirtual, setMessageVirtual] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const petInfo = useSelector((state) => state.petInfo)
    const { loading, error, pet } = petInfo

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!pet || pet._id !== id) {
            dispatch(petDetails(id))
        } else {
            setAdopted(true)
            setFostered(true)
            setVirtual(true)
        }
    }, [dispatch, navigate, id, userInfo, pet, adopted, fostered, virtual])

    const handleDelete = () => {
        dispatch(deletePet(id))
        setMessage('Pet deleted.')
        setTimeout(() => {
            navigate('/profile/pets')
        }, 2000)
    }

    const handleIsAdopted = () => {
        dispatch(updatePetToAdopted({ _id: id, isAdopted: adopted }))
        setMessageAdopt('Yeyy, I have a home and a family!')
        setTimeout(() => {
            // eslint-disable-next-line no-undef
            window.location.reload()
        }, 1500)
    }

    const handleIsFostered = () => {
        dispatch(updatePetToAdopted({ _id: id, isFostered: fostered }))
        setMessageAdopt('Yeyy, I have a home and a family!')
        setTimeout(() => {
            // eslint-disable-next-line no-undef
            window.location.reload()
        }, 1500)
    }

    const handleIsVirtual = () => {
        dispatch(updatePetToAdopted({ _id: id, isVirtualAdopted: virtual }))
        setMessageVirtual('Yeyy, thank you!')
        setTimeout(() => {
            // eslint-disable-next-line no-undef
            window.location.reload()
        }, 1500)
    }

    return (
        <section className="pet-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            {userInfo ? (
                <div className="pet-item form-container bg-white rounded-5 border w-30">
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                    {message && <Message variant="danger">{message}</Message>}
                    {messageAdopt && <Message variant="success">{messageAdopt}</Message>}
                    {messageVirtual && <Message variant="success">{messageVirtual}</Message>}

                    <div className="pet-item-img d-flex flex-column align-items-center justify-content-center bg-white">
                        <img src={pet.photo} alt={pet.name} />
                        <div className="my-3 d-flex align-items-center justify-content-center gap-3">
                            {pet.isAdopted && <Confetti width="1500px" height="800px" />}
                            {!pet.isAdopted && userInfo._id !== pet.user && (
                                <Button
                                    onClick={handleIsAdopted}
                                    className="btn-adopt"
                                    title="Adopt me"
                                >
                                    <AiOutlineHome className="fs-4" />
                                </Button>
                            )}
                            {pet.isFostered && <Confetti width="1500px" height="800px" />}
                            {!pet.isAdopted && userInfo._id !== pet.user && !pet.isFostered && (
                                <Button
                                    onClick={handleIsFostered}
                                    className="btn-adopt"
                                    title="Foster me"
                                >
                                    <FaCouch className="fs-4" />
                                </Button>
                            )}
                            {pet.isVirtualAdopted && <Confetti width="1500px" height="800px" />}
                            {!pet.isAdopted && userInfo._id !== pet.user && !pet.isVirtualAdopted && (
                                <Button
                                    onClick={handleIsVirtual}
                                    className="btn-adopt"
                                    title="Adopt me virtually"
                                >
                                    <RiHandHeartLine className="fs-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="pet-item-info">
                        <h2 className="pet-name mt-5 mb-3 fw-bold">{pet.name}</h2>
                        <p className="pet-info fw-light">{`${pet.age} years - ${pet.gender}`}</p>
                        <p className="pet-info2 border-bottom pb-3">{`${pet.name} is waiting to meet you in ${pet.place}.`}</p>
                        <div className="p-4 border-bottom">
                            <h5 className="fw-bold">More info about {pet.name}:</h5>
                            <p className="pet-about">{pet.about}</p>
                        </div>

                        <div className="py-4">
                            <h5 className="fw-bold">Info about us:</h5>
                            <p className="pet-about">{pet.userDetails}</p>
                        </div>
                        {userInfo._id !== pet.user && (
                            <Button variant="info" href={`mailto:${pet.userEmail}`}>
                                Contact us by email
                            </Button>
                        )}
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
            ) : (
                <Navigate to="/login" />
            )}
        </section>
    )
}

export default PetPage
