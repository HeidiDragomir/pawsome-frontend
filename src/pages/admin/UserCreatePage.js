import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { createUser } from '../../actions/userActions'
import { USER_CREATE_RESET } from '../../actions/types'
import './adminPage.css'

/* eslint-disable react/function-component-definition */

const UserCreatePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState('')
    const [messagePwd, setMessagePwd] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userCreate = useSelector((state) => state.userCreate)
    const { loading, error, success } = userCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_CREATE_RESET })
        }
    }, [success, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessagePwd('Password is not the same. Please try again.')
            setTimeout(() => {
                setMessagePwd('')
            }, 2000)
        } else {
            dispatch(createUser(name, email, password, isAdmin))
            setMessage('User created.')
            setTimeout(() => {
                navigate('/admin')
            }, 2000)
        }
    }

    return (
        <section className="user-create-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/admin" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>

            <div className="user-create-container form-container bg-white rounded-5 border">
                <h2 className="my-4">Create User</h2>
                {message && <Message variant="success">{message}</Message>}
                {messagePwd && <Message variant="danger">{messagePwd}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className="form-control"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            className="form-control"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            className="form-control"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className="form-admin">
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>Admin</label>
                            <input
                                className="input-admin"
                                id="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-form mt-3 w-100">
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UserCreatePage
