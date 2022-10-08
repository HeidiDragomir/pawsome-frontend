import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AboutMePage from './pages/AboutMePage'

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

                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
