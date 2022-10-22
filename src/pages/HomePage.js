import { Button } from 'react-bootstrap'
import { BiDonateHeart, BiHomeHeart } from 'react-icons/bi'
import { MdOutlineEventAvailable, MdOutlineLiveHelp } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import PetsPage from './PetsPage'
import './homepage.css'

// eslint-disable-next-line react/function-component-definition
const HomePage = () => {
    const { keyword } = useParams()

    return (
        <div className="homepage-section">
            {keyword && <PetsPage />}

            {!keyword && (
                <>
                    <Hero />
                    <div className="homepage-section-container">
                        <div className="homepage-cards-list">
                            <div className="homepage-card">
                                <Button
                                    href="/donations"
                                    type="button"
                                    className="btn-homepage-card"
                                >
                                    <BiDonateHeart className="icon fs-2" />
                                    <span>Donate</span>
                                </Button>
                            </div>
                            <div className="homepage-card">
                                <Button
                                    href="/volunteers"
                                    type="button"
                                    className="btn-homepage-card"
                                >
                                    <BiHomeHeart className="icon fs-2" />
                                    <span>Volunteer</span>
                                </Button>
                            </div>
                        </div>
                        <div className="homepage-cards-list">
                            <div className="homepage-card">
                                <Button href="/events" type="button" className="btn-homepage-card">
                                    <MdOutlineEventAvailable className="icon fs-2" />
                                    <span>Events</span>
                                </Button>
                            </div>
                            <div className="homepage-card">
                                <Button
                                    href="/questions"
                                    type="button"
                                    className="btn-homepage-card"
                                >
                                    <MdOutlineLiveHelp className="icon fs-2" />
                                    <span>Ask</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <PetsPage />
                </>
            )}
        </div>
    )
}

export default HomePage
