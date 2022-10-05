import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// eslint-disable-next-line react/function-component-definition
const App = () => {
    return (
        <Router>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
