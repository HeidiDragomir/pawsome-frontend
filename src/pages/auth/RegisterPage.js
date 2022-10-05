import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import { register } from '../../actions/authActions'

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
        <>
            <section className="heading">
                <h1>
                    <FaUser />
                    Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
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
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                <p>
                    Have you already an account?{' '}
                    <Link
                        className="link-black"
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    >
                        Login!
                    </Link>
                </p>
            </section>
        </>
    )
}

export default RegisterPage
