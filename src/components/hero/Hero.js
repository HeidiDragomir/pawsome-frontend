/* eslint-disable react/function-component-definition */
import { Button } from 'react-bootstrap'
// import { FaPaw } from 'react-icons/fa'
import './hero.css'
import HERO from '../../assets/hero.png'

const Hero = () => {
    return (
        <section className="hero-section p-5">
            <div className="hero-section-container">
                <div className="hero-section-item">
                    <div className="hero-section-text">
                        <h1 className="fw-bold">Find your new</h1>
                        <h3 className="fw-bolder">
                            <span>best friend</span>!
                        </h3>
                        <p>Meet our dogs and cats that are looking for a home.</p>
                    </div>
                    <img className="hero-img" src={HERO} alt="cute pets" />
                </div>
                <Button type="button" href="/pets" size="lg" className="btn-main-color mt-4">
                    Adopt
                </Button>
            </div>
        </section>
    )
}

export default Hero
