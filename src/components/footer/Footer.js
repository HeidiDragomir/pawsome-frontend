import { FaPaw, FaInstagramSquare } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import { SiYoutubemusic } from 'react-icons/si'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './footer.css'

// eslint-disable-next-line react/function-component-definition
const Footer = () => {
    return (
        <footer>
            <div className="footer-container p-3">
                <div className="logo-container m-1">
                    <Link to="/" className="logo-footer">
                        <div>
                            <FaPaw className="icon-footer" />
                        </div>
                        <div className="icon-text-footer">
                            Paw<span>some</span>
                        </div>
                    </Link>
                </div>
                <div className="my-3">
                    <h3 className="mt-5">Help</h3>
                    <ul className="p-0">
                        <li>
                            <Link to="/" className="footer-link">
                                Adoption process
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-link">
                                Foster process
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-link">
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="my-3">
                    <h3 className="mt-5">About us</h3>
                    <ul className="p-0">
                        <li>
                            <Link to="/" className="footer-link">
                                About Pawsome
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-link">
                                Cookies policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="footer-link">
                                Privacy policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom-container">
                <div className="footer-socials p-3">
                    <Link to="/" className="footer-socials-icons">
                        <SiYoutubemusic className="icon-footer-social" />
                    </Link>
                    <Link to="/" className="footer-socials-icons">
                        <FaInstagramSquare className="icon-footer-social" />
                    </Link>
                    <Link to="/" className="footer-socials-icons">
                        <BsFacebook className="icon-footer-social" />
                    </Link>
                    <Link to="/" className="footer-socials-icons">
                        <AiFillTwitterCircle className="icon-footer-social-twitter" />
                    </Link>
                </div>
                <div className="footer-socials-copyright">
                    <p className="m-auto p-2">&copy; 2022 Pawsome</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
