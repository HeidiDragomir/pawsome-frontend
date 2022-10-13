import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AboutMePage from './pages/AboutMePage'
import PetPage from './pages/PetPage'
import MyPetsPage from './pages/MyPetsPage'
import PetCreatePage from './pages/PetCreatePage'
import PetEditPage from './pages/PetEditPage'

// eslint-disable-next-line react/function-component-definition
const App = () => {
    return (
        <Router>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} exact />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/aboutme" element={<AboutMePage />} />
                    <Route path="/profile/pets" element={<MyPetsPage />} />
                    <Route path="/pet/create" element={<PetCreatePage />} />

                    <Route path="/pet/:id/edit" element={<PetEditPage />} />
                    <Route path="/pet/:id" element={<PetPage />} />

                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
