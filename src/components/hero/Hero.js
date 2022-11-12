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
                        <h1 className="fw-bold">Find</h1>
                        <h2 className="fw-bolder">
                            your new
                            <span> best friend</span>!
                        </h2>
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
                        alt="cute cats and dogs"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
