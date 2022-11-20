import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Unprotected Landing Pages
import LandingLayout from './components/LandingLayout';
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
import TeacherDonationPage from './pages/Donation/TeacherDonationPage';
import StudentDonationPage from './pages/Donation/StudentDonationPage';
import ThankyouLayout from './components/TeacherDonation/ThankyouLayout';
import ThankyouPage from './pages/Donation/ThankyouPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Landing Page */}
                <Route path='/' exact element={<LandingLayout />}>
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
                    path='/teachers/dashboard'
                    exact
                    element={<DashboardLayout />}
                >
                    <Route index element={<TeacherDashboardPage />} />
                    <Route path='donors' element={<DonorDashboardPage />} />
                    <Route path='settings' element={<Settings />} />
                </Route>
                {/* Public Donation */}
                <Route
                    path='/donations/teachers/:teacherId'
                    element={<DonationLayout />}
                >
                    <Route exact index element={<TeacherDonationPage />} />
                    <Route
                        exact
                        path='students/:studentId'
                        element={<StudentDonationPage />} />
                </Route>
                <Route path='/donations/students/' element={<ThankyouLayout />}>
                    <Route index path=':studentId' exact element={<ThankyouPage />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
