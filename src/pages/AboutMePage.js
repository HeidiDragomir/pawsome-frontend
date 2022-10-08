import { Form } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const AboutMePage = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>About Me</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </Form>
    )
}

export default AboutMePage
