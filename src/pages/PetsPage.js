import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardPet from '../components/card/CardPet'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'

import { listPets } from '../actions/petActions'

// eslint-disable-next-line react/function-component-definition
const PetsPage = () => {
    const dispatch = useDispatch()

    const petList = useSelector((state) => state.petList)
    const { loading, error, pets } = petList

    useEffect(() => {
        dispatch(listPets())
    }, [dispatch])

    return (
        <section className="pets-section">
            <div className="pets-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <div className="pets">
                    {pets.map((pet) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <CardPet key={pet._id} pet={pet} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PetsPage