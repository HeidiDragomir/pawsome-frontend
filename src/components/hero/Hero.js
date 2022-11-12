/* eslint-disable react/function-component-definition */
import { Button } from 'react-bootstrap'
import './hero.css'
import HERO from '../../assets/hero.png'

const Hero = () => {
    return (
        <section className="hero-section p-5">
            <div className="hero-section-container">
                <div className="hero-section-item">
                    <div className="hero-section-text">
                        <h2 className="fw-bold">Find</h2>
                        <h3 className="fw-bolder">
                            your new
                            <span> best friend</span>!
                        </h3>
                        <p>Meet our dogs and cats that are looking for a home.</p>
                        <Button
                            type="button"
                            href="/pets"
                            size="lg"
                            className="btn-main-color mt-4"
                        >
                            Adopt
                        </Button>
                    </div>
                    <img
                        className="hero-img"
                        src={HERO}
                        width="20em"
                        height="auto"
                        alt="cute pets"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
