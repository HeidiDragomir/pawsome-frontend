/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyPets } from '../actions/petActions'
import Card from '../components/card/Card'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'

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
                <Link to="/profile" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="pets-container">
                <Button type="button" href="/pet/create">
                    Create
                </Button>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <div className="pets">
                    {pets.map((pet) => (
                        <Card key={pet._id} pet={pet} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyPetsPage
