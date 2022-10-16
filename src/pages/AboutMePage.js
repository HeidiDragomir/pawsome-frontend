/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
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
    const [message, setMessage] = useState(null)
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
            setMessage('Password is not the same. Please try again.')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password, details }))
        }

        navigate('/profile')
    }
    return (
        <section className="aboutme-section">
            <div className="mb-5 ms-5">
                <Link to="/profile" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="aboutme-container">
                <h2>My Details</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Account is updated</Message>}
                {loading && <Loader />}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Name</label>
                    </div>
                    <div className="form-group">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Email</label>
                    </div>
                    <div className="form-group">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>
                            New password <small>*(free)</small>
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Confirm password</label>
                    </div>
                    <div className="form-group">
                        <textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Details</label>
                    </div>
                    <button type="submit" className="btn-black w-100">
                        Update
                    </button>
                </form>
                {/* <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <textarea
                            id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form> */}
            </div>
        </section>
    )
}

export default AboutMePage
