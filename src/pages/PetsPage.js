import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardPet from '../components/card/CardPet'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import './cardsPage.css'
import { listPets } from '../actions/petActions'

// eslint-disable-next-line react/function-component-definition
const PetsPage = () => {
    const dispatch = useDispatch()
    const { keyword } = useParams()

    const petList = useSelector((state) => state.petList)
    const { loading, error, pets } = petList

    useEffect(() => {
        if (keyword) {
            dispatch(listPets(keyword))
        } else {
            dispatch(listPets())
        }
    }, [dispatch, keyword])

    return (
        <section className="cards-section">
            <div className="cards-container">
                {!loading && pets.length === 0 && <h4 className="text-center">Nothing found.</h4>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {pets.map((pet) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <CardPet key={pet._id} pet={pet} />
                ))}
            </div>
        </section>
    )
}

export default PetsPage
