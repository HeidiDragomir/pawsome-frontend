/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft, BsPersonBoundingBox } from 'react-icons/bs'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../actions/types'

// eslint-disable-next-line react/function-component-definition
const AboutMePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [details, setDetails] = useState('')
    const [message, setMessage] = useState('')
    const [messagePwd, setMessagePwd] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
                setDetails(user.details)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessagePwd('Password is not the same. Please try again.')
            setTimeout(() => {
                setMessagePwd('')
            }, 2000)
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password, details }))
            setMessage('Profile updated.')
            setTimeout(() => {
                navigate('/profile')
            }, 2000)
        }
    }
    return (
        <section className="aboutme-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/profile" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="aboutme-container form-container bg-white rounded-5 border">
                <h2 className="my-4">
                    <BsPersonBoundingBox className="icon-form" />
                    My Info
                </h2>
                {message && <Message variant="success">{message}</Message>}
                {messagePwd && <Message variant="danger">{messagePwd}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Account is updated</Message>}
                {loading && <Loader />}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className="form-control"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            id="password"
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <textarea
                            id="details"
                            value={details}
                            placeholder="Details"
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-form mt-3 w-100">
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AboutMePage
