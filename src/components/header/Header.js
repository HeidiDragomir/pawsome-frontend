import { FaSignInAlt, FaSignOutAlt, FaUser, FaAngellist } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const Header = () => {
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
                    <Link to="/">
                        <FaSignOutAlt />
                        Logout
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
