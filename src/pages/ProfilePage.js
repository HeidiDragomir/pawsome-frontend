import { Button } from 'react-bootstrap'
import { BiDonateHeart, BiHomeHeart } from 'react-icons/bi'
import { MdOutlineEventAvailable, MdOutlineLiveHelp } from 'react-icons/md'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { FaPaw } from 'react-icons/fa'
import './profilePage.css'

// eslint-disable-next-line react/function-component-definition
const ProfilePage = () => {
    return (
        <div className="profile-section">
            <div className="btn-group">
                <Button type="button" className="btn-profile fw-bold" href="/profile/aboutme">
                    <BsPersonBoundingBox className="icon fs-2" />
                    About me
                </Button>
                <Button
                    className="btn-profile fw-bold"
                    type="button"
                    variant="primary"
                    href="/profile/pets"
                >
                    <FaPaw className="icon fs-2" />
                    My pets
                </Button>
                <Button
                    className="btn-profile fw-bold"
                    type="button"
                    variant="primary"
                    href="/profile/events"
                >
                    <MdOutlineEventAvailable className="icon fs-2" />
                    My events
                </Button>
                <Button
                    className="btn-profile fw-bold"
                    type="button"
                    variant="primary"
                    href="/profile/donations"
                >
                    <BiDonateHeart className="icon fs-2" />
                    Donate items
                </Button>
                <Button
                    className="btn-profile fw-bold"
                    type="button"
                    variant="primary"
                    href="/profile/volunteers"
                >
                    <BiHomeHeart className="icon fs-2" />
                    Volunteer
                </Button>
                <Button
                    className="btn-profile fw-bold"
                    type="button"
                    variant="primary"
                    href="/profile/questions"
                >
                    <MdOutlineLiveHelp className="icon fs-2" />
                    Ask something
                </Button>
            </div>
        </div>
    )
}

export default ProfilePage
