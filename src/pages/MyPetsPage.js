/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listMyPets } from '../actions/petActions'
import Card from '../components/card/Card'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'

// eslint-disable-next-line react/function-component-definition
const MyPetsPage = () => {
    const dispatch = useDispatch()

    const petMyList = useSelector((state) => state.petMyList)
    const { loading, error, pets } = petMyList

    useEffect(() => {
        dispatch(listMyPets())
    }, [dispatch])

    return (
        <section className="pets-section">
            <div className="pets-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Button href="/pet/create">Create</Button>
                <div className="pets">
                    {pets.map((pet) => (
                        <Card key={pet._id} pet={pet} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyPetsPage
