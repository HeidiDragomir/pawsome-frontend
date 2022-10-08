import { Button, ButtonGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/function-component-definition
const ProfilePage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/profile/aboutme')
    }
    return (
        <>
            <h2>My Pawsome page</h2>
            <ButtonGroup aria-label="Profile">
                <Button type="button" variant="primary" onClick={handleClick}>
                    About me
                </Button>
                <Button type="button" variant="primary" onClick={handleClick}>
                    Dog/cat profile
                </Button>
                <Button type="button" variant="primary" onClick={handleClick}>
                    Create event
                </Button>
                <Button type="button" variant="primary" onClick={handleClick}>
                    Donate
                </Button>
                <Button type="button" variant="primary" onClick={handleClick}>
                    Volunteer
                </Button>
                <Button type="button" variant="primary" onClick={handleClick}>
                    Ask something
                </Button>
            </ButtonGroup>
        </>
    )
}

export default ProfilePage
