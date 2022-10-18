import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutUsPage';
import HowItWorksPage from './pages/HowItWorks';
import SignupPage from './pages/SignupPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="/" exact element={<HomePage />}>
              </Route>
              <Route path="/home" exact element={<HomePage />}>
              </Route>
              <Route path="/login" exact element={<LoginPage />}>
              </Route>
              <Route path="/aboutus" exact element={<AboutPage />}>
              </Route>
              <Route path="/signup" exact element={<SignupPage />}>
              </Route>              
              <Route path="/howitworks" exact element={<HowItWorksPage />}>
              </Route>
              <Route path="/teacherdashboard" exact element={<TeacherDashboardPage />}>
              </Route>
            </Routes>
        </Router>
    </div>
  );
}; 

export default App;
