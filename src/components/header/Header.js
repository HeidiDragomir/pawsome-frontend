import { NavDropdown } from 'react-bootstrap'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaAngellist } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../actions/authActions'

// eslint-disable-next-line react/function-component-definition
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
        // eslint-disable-next-line no-undef
        window.location.reload(true)
    }
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Pets Home Logo</Link>
            </div>
            <ul>
                <li>
                    {!userInfo && (
                        <Link to="/login">
                            <FaSignInAlt />
                            Login
                        </Link>
                    )}
                </li>
                <li>
                    {!userInfo && (
                        <Link to="/register">
                            <FaUser />
                            Register
                        </Link>
                    )}
                </li>
                <li>
                    {userInfo && (
                        <Link to="/profile">
                            <FaSignInAlt />
                            My Profile
                        </Link>
                    )}
                </li>
                <li>
                    {userInfo && userInfo.isAdmin && (
                        <Link to="/admin">
                            <FaAngellist />
                            Admin
                        </Link>
                    )}
                </li>
                <li>
                    {userInfo && (
                        <NavDropdown.Item onClick={logoutHandler}>
                            <FaSignOutAlt />
                            Logout
                        </NavDropdown.Item>
                    )}
                </li>
            </ul>
        </header>
    )
}

export default Header
