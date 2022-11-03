import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Unprotected Landing Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutUsPage';
import HowItWorksPage from './pages/HowItWorks';
import SignupPage from './pages/SignupPage';
// Protected Dashboard Pages
import DashboardLayout from './components/TeacherDashboard/DashboardLayout';
import TeacherDashboardPage from './pages/Dashboard/TeacherDashboardPage';
import DonorDashboardPage from './pages/Dashboard/DonorDashboardPage';
import Settings from './pages/Dashboard/Settings';
// Public Donation Pages
import DonationLayout from './components/TeacherDonation/DonationLayout';
import TeacherDonationPage from './pages/TeacherDonationPage';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    {/* Landing Page */}
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
                    {/* Teacher Protected Dashboard */}
                    <Route
                        path='/teachers/:teacherId/dashboard'
                        exact
                        element={<DashboardLayout />}
                    >
                        <Route index element={<TeacherDashboardPage />} />
                        {/* <Route path='/:teacherId/supplies' element={SuppliesList} /> */}
                        <Route path='donors' element={<DonorDashboardPage />} />
                        <Route path='settings' element={<Settings />} />
                    </Route>
                    {/* Public Donation */}
                    <Route path='/donations' exact element={<DonationLayout />}>
                        <Route index element={<TeacherDonationPage />} />
                        {/* /donation/teacher/:teacherId/ */}
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
