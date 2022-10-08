import { NavDropdown } from 'react-bootstrap'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaAngellist } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/authActions'

// eslint-disable-next-line react/function-component-definition
const Header = () => {
    const dispatch = useDispatch()
    // const userLogin = useSelector((state) => state.userLogin)
    // const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Pets Home Logo</Link>
            </div>
            <ul>
                <li>
                    <Link to="/login">
                        <FaSignInAlt />
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        <FaUser />
                        Register
                    </Link>
                </li>
                <li>
                    <Link to="/admin">
                        <FaAngellist />
                        Admin
                    </Link>
                </li>
                <li>
                    <NavDropdown.Item onClick={logoutHandler}>
                        <FaSignOutAlt />
                        Logout
                    </NavDropdown.Item>
                </li>
            </ul>
        </header>
    )
}

export default Header
