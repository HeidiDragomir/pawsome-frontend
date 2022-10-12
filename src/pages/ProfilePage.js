import { Button, ButtonGroup } from 'react-bootstrap'

// eslint-disable-next-line react/function-component-definition
const ProfilePage = () => {
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
                <Button type="button" variant="primary" href="/profile/aboutme">
                    Create event
                </Button>
                <Button type="button" variant="primary" href="/profile/aboutme">
                    Donate items
                </Button>
                <Button type="button" variant="primary" href="/profile/aboutme">
                    Volunteer
                </Button>
                <Button type="button" variant="primary" href="/profile/aboutme">
                    Ask something
                </Button>
            </ButtonGroup>
        </>
    )
}

export default ProfilePage
