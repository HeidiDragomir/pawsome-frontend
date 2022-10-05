import Alert from 'react-bootstrap/Alert'

// eslint-disable-next-line react/function-component-definition
const Message = ({ variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
    variant: 'info',
}

export default Message
