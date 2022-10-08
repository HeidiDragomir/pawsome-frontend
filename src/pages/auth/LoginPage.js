import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import { login } from '../../actions/authActions'

// eslint-disable-next-line react/function-component-definition
const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/profile'

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
        <>
            <section className="heading">
                <h1>
                    <FaUser />
                    Login
                </h1>
                <p>Login and start create profile</p>
            </section>

            <section className="form">
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
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                <p>
                    No account?{' '}
                    <Link
                        className="link-black"
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    >
                        Please signup here!
                    </Link>
                </p>
            </section>
        </>
    )
}

export default LoginPage
