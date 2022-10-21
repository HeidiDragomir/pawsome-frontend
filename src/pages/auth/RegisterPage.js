import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import { register } from '../../actions/authActions'
import './auth.css'

// eslint-disable-next-line react/function-component-definition
const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [message, setMessage] = useState()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector((state) => state.userRegister)
    const { error, loading, userInfo } = userRegister
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage(`It's not the same password. Please try again!`)
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <section className="section-register flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="form-container bg-white rounded-5 border">
                <h2 className="my-4">
                    <FaUser className="icon-form" />
                    Sign up
                </h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Email Adress"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-form mt-3">
                        Register
                    </button>
                </form>
                <div className="border-form w-100 mt-4">
                    <div className="d-flex justify-content-center mt-3">
                        <h2 className="text-form">Already have an account?</h2>
                        <h2 className="text-form">
                            <Link
                                className="link-black fw-bold"
                                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            >
                                Login!
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage
