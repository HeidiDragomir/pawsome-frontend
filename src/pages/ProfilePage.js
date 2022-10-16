import { Button, ButtonGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/function-component-definition
const ProfilePage = () => {
    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails

    return (
        <>
            <h2>My Pawsome page</h2>
            <ButtonGroup aria-label="Profile">
                <Button type="button" href="/profile/aboutme" variant="primary">
                    About me
                </Button>
                <Button type="button" variant="primary" href="/profile/pets">
                    My pets
                </Button>
                <Button type="button" variant="primary" href="/profile/events">
                    My events
                </Button>
                <Button type="button" variant="primary" href="/profile/donations">
                    Donate items
                </Button>
                <Button type="button" variant="primary" href="/profile/volunteers">
                    Volunteer
                </Button>
                <Button type="button" variant="primary" href="/profile/questions">
                    Ask something
                </Button>
            </ButtonGroup>
            <h3>{user.details}</h3>
        </>
    )
}

export default ProfilePage
