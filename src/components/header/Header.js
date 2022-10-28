import { FaSignInAlt, FaUser, FaSignOutAlt, FaPaw } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { BsFillPeopleFill } from 'react-icons/bs'
import { ImProfile } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { logout } from '../../actions/authActions'
import './header.css'
import Search from '../search/Search'

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
            <nav>
                <Navbar bg="light" expand="xl">
                    <Container>
                        <Nav.Link className="logo-container" href="/">
                            <div className="logo">
                                <div>
                                    <FaPaw className="icon fs-2" />
                                </div>
                                <div className="icon-text fs-2">
                                    Paw<span>some</span>
                                </div>
                            </div>
                        </Nav.Link>
                        <Navbar.Toggle aria-controls="navbar" />
                        <Navbar.Collapse id="navbar">
                            <Nav className="me-auto stroke">
                                <Nav.Link href="/" className="nav-link fs-5 px-3">
                                    Home
                                </Nav.Link>
                                <Nav.Link href="/pets" className="nav-link fs-5 px-3">
                                    Pets
                                </Nav.Link>
                                <Nav.Link href="/donations" className="nav-link fs-5 px-3">
                                    Donate
                                </Nav.Link>
                                <Nav.Link href="/volunteers" className="nav-link fs-5 px-3">
                                    Volunteer
                                </Nav.Link>
                                <Nav.Link href="/events" className="nav-link fs-5 px-3">
                                    Events
                                </Nav.Link>
                                <Nav.Link href="/questions" className="nav-link fs-5 px-3">
                                    Ask
                                </Nav.Link>
                            </Nav>
                            <Search />
                            {userInfo ? (
                                <div className="nav-user">
                                    <BiUser className="icon fs-4" />
                                    <NavDropdown
                                        title={`Welcome, ${userInfo.name}`}
                                        id="username"
                                        className="pt-2 fs-5"
                                    >
                                        <NavDropdown.Item href="/profile">
                                            <ImProfile className="icon" /> Profile
                                        </NavDropdown.Item>

                                        {userInfo.isAdmin && (
                                            <NavDropdown.Item href="/admin">
                                                <BsFillPeopleFill className="icon-users" />
                                                Users
                                            </NavDropdown.Item>
                                        )}
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            <FaSignOutAlt className="icon" /> Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            ) : (
                                <>
                                    <Nav.Link className="nav-link fs-5 p-2" href="/login">
                                        <FaSignInAlt className="icon icon-text" />
                                        Login
                                    </Nav.Link>
                                    <Nav.Link className="nav-link fs-5 p-2" href="/register">
                                        <FaUser className="icon icon-text" />
                                        Register
                                    </Nav.Link>
                                </>
                            )}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </nav>
        </header>
    )
}

export default Header
