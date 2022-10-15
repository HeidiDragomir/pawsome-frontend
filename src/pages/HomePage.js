import Pets from '../components/pets/Pets'
import Events from '../components/events/Events'
import Donations from '../components/donations/Donations'
import Volunteers from '../components/volunteers/Volunteers'
import Questions from '../components/questions/Questions'

// eslint-disable-next-line react/function-component-definition
const HomePage = () => {
    return (
        <div>
            <h2>HomePage</h2>
            <Pets />
            <Events />
            <Donations />
            <Volunteers />
            <Questions />
        </div>
    )
}

export default HomePage
