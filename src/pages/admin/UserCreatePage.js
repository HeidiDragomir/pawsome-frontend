import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { createUser } from '../../actions/userActions'
import { USER_CREATE_RESET } from '../../actions/types'

/* eslint-disable react/function-component-definition */

const UserCreatePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userCreate = useSelector((state) => state.userCreate)
    const { loading, error, success } = userCreate

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_CREATE_RESET })
            navigate('/admin')
        }
    }, [success, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password is not the same. Please try again.')
        } else {
            dispatch(createUser(name, email, password, isAdmin))
        }
    }

    return (
        <section className="section-user-create">
            <div className="mb-5 ms-5">
                <Link to="/admin" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>

            <div className="center">
                <h2>Skapa Användare</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
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
                            required
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>New password</label>
                    </div>
                    <div className="form-group">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Confirm password</label>
                    </div>
                    <div className="form-group">
                        <input
                            id="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Admin</label>
                    </div>
                    <button type="submit" className="btn-black w-100">
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UserCreatePage
