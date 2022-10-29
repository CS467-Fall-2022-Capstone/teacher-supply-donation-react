import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Landing Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutUsPage';
import HowItWorksPage from './pages/HowItWorks';
import SignupPage from './pages/SignupPage';
// Dashboard Pages
import DashboardLayout from './components/TeacherDashboard/DashboardLayout';
import TeacherDashboardPage from './pages/Dashboard/TeacherDashboardPage';
import Settings from './pages/Dashboard/Settings';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' exact>
                        <Route index element={<HomePage />} />
                        <Route path='login' element={<LoginPage />} />
                        <Route path='aboutus' element={<AboutPage />} />
                        <Route path='signup' element={<SignupPage />} />
                        <Route
                            path='howitworks'
                            exact
                            element={<HowItWorksPage />}
                        />
                    </Route>
                    <Route path='/teacher' exact element={<DashboardLayout />}>
                        <Route index element={<TeacherDashboardPage />} />
                        <Route path='settings' element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
