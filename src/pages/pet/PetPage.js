/* eslint-disable no-underscore-dangle */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AiOutlineHome } from 'react-icons/ai'
import { FaCouch } from 'react-icons/fa'
import { RiHandHeartLine } from 'react-icons/ri'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { petDetails, deletePet, updatePetToAdopted } from '../../actions/petActions'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'

const PetPage = () => {
    const [adopted, setAdopted] = useState(false)
    const [fostered, setFostered] = useState(false)
    const [virtual, setVirtual] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const petInfo = useSelector((state) => state.petInfo)
    const { loading, error, pet } = petInfo

    // const petUpdateToAdopted = useSelector((state) => state.petUpdateToAdopted)
    // const { success } = petUpdateToAdopted

    const { id } = useParams()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!pet || pet._id !== id) {
            dispatch(petDetails(id))
        } else {
            setAdopted(true)
            setFostered(true)
            setVirtual(true)
        }
    }, [dispatch, id, userInfo, navigate, pet, adopted, fostered, virtual])

    const handleDelete = () => {
        dispatch(deletePet(id))
        navigate('/profile/pets')
    }

    const handleIsAdopted = () => {
        setAdopted(true)
        dispatch(updatePetToAdopted({ _id: id, isAdopted: adopted }))
        // eslint-disable-next-line no-undef
        window.location.reload(true)
    }

    const handleIsVirtual = () => {
        setVirtual(true)
        dispatch(updatePetToAdopted({ _id: id, isVirtualAdopted: virtual }))
        // eslint-disable-next-line no-undef
        window.location.reload(true)
    }

    const handleIsFostered = () => {
        setFostered(true)
        dispatch(updatePetToAdopted({ _id: id, isFostered: fostered }))
        // eslint-disable-next-line no-undef
        window.location.reload(true)
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
                <div className="pet-item-img d-flex flex-column align-items-center justify-content-center bg-white">
                    <img src={pet.photo} alt={pet.name} />
                    <div className="my-3 d-flex align-items-center justify-content-center gap-3">
                        {pet.isAdopted && <Confetti width="1500px" height="800px" />}
                        {!pet.isAdopted && userInfo._id !== pet.user && (
                            <Button onClick={handleIsAdopted} className="btn-adopt">
                                <AiOutlineHome className="fs-4" />
                            </Button>
                        )}
                        {pet.isFostered && <Confetti width="1500px" height="800px" />}
                        {!pet.isAdopted && userInfo._id !== pet.user && !pet.isFostered && (
                            <Button onClick={handleIsFostered} className="btn-adopt">
                                <FaCouch className="fs-4" />
                            </Button>
                        )}
                        {pet.isVirtualAdopted && <Confetti width="1500px" height="800px" />}
                        {!pet.isAdopted && userInfo._id !== pet.user && !pet.isVirtualAdopted && (
                            <Button onClick={handleIsVirtual} className="btn-adopt">
                                <RiHandHeartLine className="fs-4" />
                            </Button>
                        )}
                    </div>
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
