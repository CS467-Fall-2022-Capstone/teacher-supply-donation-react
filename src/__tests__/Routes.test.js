import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import HowItWorksPage from '../pages/HowItWorks';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

import { BrowserRouter } from 'react-router-dom';


afterEach(cleanup);

test('Home Page rendering', async () => {
    render(<HomePage />, { wrapper: BrowserRouter })

    //expect(screen.getByText(/read how it works./i)).toBeInTheDocument();
    expect(screen.getByTestId('howItWorksBtn')).toBeInTheDocument();

    //NOT WORKING - Attempt to click button and navigate to another page
    /*
    userEvent.click(screen.getByTestId('howItWorksBtn'));

    expect(screen.getByText(/teachers can view/i)).toBeInTheDocument();
    */
});

test('AboutUsPage rendering', async () => {

    render(<AboutUsPage />, { wrapper: BrowserRouter })

    await expect(screen.getByText(/our team/i)).toBeInTheDocument();

});

test('HowItWorks rendering', async () => {

    render(<HowItWorksPage />, { wrapper: BrowserRouter })

    await expect(screen.getByText(/teachers can view the list of donors/i)).toBeInTheDocument();
});

test('LoginPage rendering', async () => {

    render(<LoginPage />, { wrapper: BrowserRouter })

    await expect(screen.getByText(/login with Google/i)).toBeInTheDocument();
});

test('SignupPage rendering', async () => {

    render(<SignupPage />, { wrapper: BrowserRouter })

    await expect(screen.getByText(/sign up to get started/i)).toBeInTheDocument();
});

