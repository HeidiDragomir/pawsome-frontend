/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { listMyVolunteers } from '../actions/volunteerActions'
import CardVolunteer from '../components/card/CardVolunteer'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const MyVolunteersPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const volunteerMyList = useSelector((state) => state.volunteerMyList)
    const { loading, error, volunteers } = volunteerMyList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyVolunteers())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    return (
        <section className="volunteers-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="volunteers-container">
                <Button type="button" href="/volunteer/create">
                    Create
                </Button>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <div className="volunteers">
                    {volunteers.map((volunteer) => (
                        <CardVolunteer key={volunteer._id} volunteer={volunteer} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyVolunteersPage
