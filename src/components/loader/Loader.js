import { Spinner } from 'react-bootstrap'

// eslint-disable-next-line react/function-component-definition
const Loader = () => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{ width: '80px', height: '80px', margin: 'auto', display: 'block' }}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loader
