// import Events from '../components/events/Events'
// import Donations from '../components/donations/Donations'
// import Volunteers from '../components/volunteers/Volunteers'
// import Questions from '../components/questions/Questions'
import PetsPage from './PetsPage'

// eslint-disable-next-line react/function-component-definition
const HomePage = () => {
    return (
        <div className="container">
            <h2>HomePage</h2>
            <PetsPage />
            {/* <Events />
            <Donations />
            <Volunteers />
            <Questions /> */}
        </div>
    )
}

export default HomePage
