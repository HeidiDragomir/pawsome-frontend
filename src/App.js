import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AdminPage from './pages/admin/AdminPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AboutMePage from './pages/AboutMePage'
import PetPage from './pages/pet/PetPage'
import MyPetsPage from './pages/MyPetsPage'
import PetCreatePage from './pages/pet/PetCreatePage'
import PetEditPage from './pages/pet/PetEditPage'
import EventPage from './pages/event/EventPage'
import MyEventsPage from './pages/MyEventsPage'
import EventCreatePage from './pages/event/EventCreatePage'
import EventEditPage from './pages/event/EventEditPage'
import DonationPage from './pages/donation/DonationPage'
import MyDonationsPage from './pages/MyDonationsPage'
import DonationCreatePage from './pages/donation/DonationCreatePage'
import DonationEditPage from './pages/donation/DonationEditPage'
import VolunteerPage from './pages/volunteer/VolunteerPage'
import MyVolunteersPage from './pages/MyVolunteersPage'
import VolunteerCreatePage from './pages/volunteer/VolunteerCreatePage'
import VolunteerEditPage from './pages/volunteer/VolunteerEditPage'
import QuestionPage from './pages/question/QuestionPage'
import MyQuestionsPage from './pages/MyQuestionsPage'
import QuestionCreatePage from './pages/question/QuestionCreatePage'
import QuestionEditPage from './pages/question/QuestionEditPage'
import UserCreatePage from './pages/admin/UserCreatePage'
import UserEditPage from './pages/admin/UserEditPage'
import PetsPage from './pages/PetsPage'
import EventsPage from './pages/EventsPage'
import DonationsPage from './pages/DonationsPage'
import VolunteersPage from './pages/VolunteersPage'
import QuestionsPage from './pages/QuestionsPage'

// eslint-disable-next-line react/function-component-definition
const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/search/:keyword" element={<HomePage />} exact />
                <Route path="/pets" element={<PetsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/donations" element={<DonationsPage />} />
                <Route path="/volunteers" element={<VolunteersPage />} />
                <Route path="/questions" element={<QuestionsPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/aboutme" element={<AboutMePage />} />

                <Route path="/profile/pets" element={<MyPetsPage />} />
                <Route path="/pet/create" element={<PetCreatePage />} />
                <Route path="/pet/:id/edit" element={<PetEditPage />} />
                <Route path="/pet/:id" element={<PetPage />} />

                <Route path="/profile/events" element={<MyEventsPage />} />
                <Route path="/event/create" element={<EventCreatePage />} />
                <Route path="/event/:id/edit" element={<EventEditPage />} />
                <Route path="/event/:id" element={<EventPage />} />

                <Route path="/profile/donations" element={<MyDonationsPage />} />
                <Route path="/donation/create" element={<DonationCreatePage />} />
                <Route path="/donation/:id/edit" element={<DonationEditPage />} />
                <Route path="/donation/:id" element={<DonationPage />} />

                <Route path="/profile/volunteers" element={<MyVolunteersPage />} />
                <Route path="/volunteer/create" element={<VolunteerCreatePage />} />
                <Route path="/volunteer/:id/edit" element={<VolunteerEditPage />} />
                <Route path="/volunteer/:id" element={<VolunteerPage />} />

                <Route path="/profile/questions" element={<MyQuestionsPage />} />
                <Route path="/question/create" element={<QuestionCreatePage />} />
                <Route path="/question/:id/edit" element={<QuestionEditPage />} />
                <Route path="/question/:id" element={<QuestionPage />} />

                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/user/create" element={<UserCreatePage />} />
                <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
