import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import { login } from '../../actions/authActions'
import './auth.css'

// eslint-disable-next-line react/function-component-definition
const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)

            // eslint-disable-next-line no-undef
            window.location.reload()
        }
    }, [navigate, userInfo, redirect, dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <section className="section-register flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="form-container bg-white rounded-5 border">
                <h1 className="my-4">
                    <FaUser className="icon-form" />
                    Login
                </h1>

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
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
                    </div>
                    <button type="submit" className="btn-form mt-3">
                        Login
                    </button>
                </form>
                <div className="border-form w-100 mt-4">
                    <div className="d-flex justify-content-center mt-3 gap-2">
                        <h2 className="text-form">{`Don't have an account?`} </h2>
                        <h2 className="text-form">
                            <Link
                                className="link-black fw-bold"
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                            >
                                Signup here!
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
