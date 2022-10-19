// import Events from '../components/events/Events'
// import Donations from '../components/donations/Donations'
// import Volunteers from '../components/volunteers/Volunteers'
// import Questions from '../components/questions/Questions'
import { Button } from 'react-bootstrap'
import { BiDonateHeart, BiHomeHeart } from 'react-icons/bi'
import { MdOutlineEventAvailable, MdOutlineLiveHelp } from 'react-icons/md'
import Hero from '../components/hero/Hero'
import PetsPage from './PetsPage'
import './homepage.css'

// eslint-disable-next-line react/function-component-definition
const HomePage = () => {
    return (
        <div className="homepage-section">
            <Hero />
            <div className="homepage-section-container">
                <div className="homepage-cards">
                    <ul className="homepage-cards-list">
                        <li className="homepage-card">
                            <Button href="/donations" type="button" className="btn-homepage-card">
                                <BiDonateHeart className="icon fs-2" />
                                <span>Donate</span>
                            </Button>
                        </li>
                        <li className="homepage-card">
                            <Button href="/volunteers" type="button" className="btn-homepage-card">
                                <BiHomeHeart className="icon fs-2" />
                                <span>Volunteer</span>
                            </Button>
                        </li>
                        <li className="homepage-card">
                            <Button href="/events" type="button" className="btn-homepage-card">
                                <MdOutlineEventAvailable className="icon fs-2" />
                                <span>Events</span>
                            </Button>
                        </li>
                        <li className="homepage-card">
                            <Button href="/questions" type="button" className="btn-homepage-card">
                                <MdOutlineLiveHelp className="icon fs-2" />
                                <span>Ask</span>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <PetsPage />
            {/* <Events />
            <Donations />
            <Volunteers />
            <Questions /> */}
        </div>
    )
}

export default HomePage
