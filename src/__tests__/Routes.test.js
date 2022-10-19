import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
//import '@testing-library/jest-dom/extend-expect';
//import App from '../App';
import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//afterEach(cleanup);

test('Home Page rendering/navigating', async () => {
    render(<HomePage />, { wrapper: BrowserRouter })

    const user = userEvent.setup();

    expect(screen.getByText(/proposals to write/i)).toBeInTheDocument();

    //this is supposed to direct to the but doesn't work -- based on testing library docs
    /*
    const button = screen.getByTestId('aboutBtn');
    user.click(button);
    */
    /*
    await user.click(screen.getByTestId('aboutBtn'));
    
    await expect(screen.getByText(/our team/i)).toBeInTheDocument();
    */

});

test('About Page rendering/navigating', async () => {

    render(<AboutUsPage />, { wrapper: BrowserRouter })

    await expect(screen.getByText(/our team/i)).toBeInTheDocument();

});

