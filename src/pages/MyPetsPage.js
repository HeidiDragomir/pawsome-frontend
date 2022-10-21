/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyPets } from '../actions/petActions'
import CardPet from '../components/card/CardPet'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import './petsPage.css'

// eslint-disable-next-line react/function-component-definition
const MyPetsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const petMyList = useSelector((state) => state.petMyList)
    const { loading, error, pets } = petMyList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyPets())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    return (
        <section className="pets-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="pets-container d-flex align-items-center justify-content-center mb-5">
                <Button type="button" className="btn-main-color" href="/pet/create">
                    Add new pet
                </Button>
            </div>
            <div className="cards-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {pets.length === 0 && <h2>Nothing found.</h2>}
                {pets.map((pet) => (
                    <CardPet key={pet._id} pet={pet} />
                ))}
            </div>
        </section>
    )
}

export default MyPetsPage
