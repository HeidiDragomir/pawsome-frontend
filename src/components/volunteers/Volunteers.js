import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardVolunteer from '../card/CardVolunteer'
import Loader from '../loader/Loader'
import Message from '../message/Message'

import { listVolunteers } from '../../actions/volunteerActions'

// eslint-disable-next-line react/function-component-definition
const Volunteers = () => {
    const dispatch = useDispatch()

    const volunteerList = useSelector((state) => state.volunteerList)
    const { loading, error, volunteers } = volunteerList

    useEffect(() => {
        dispatch(listVolunteers())
    }, [dispatch])

    return (
        <section className="volunteers-section">
            <div className="volunteers-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <div className="volunteers">
                    {volunteers.map((volunteer) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <CardVolunteer key={volunteer._id} volunteer={volunteer} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Volunteers
