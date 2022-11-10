import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API;

class AuthService {
    /**
     *
     * POST {email, password} & save response (and JWT token) to Session Storage
     */
    async logIn(email, password) {
        try {
            //For testing
            //console.log(`AuthService data sending: Email: ${email}, Pass: ${password}`);
            let response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     *
     * Initial registration at POST {name, email, password}
     * If response successful, saves the user data including JWT in session storage
     */

    async signUp(name, email, password) {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                return response.data;
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * Functions for accessing sending requests to the backend
     */
    createAuthRequest(teacher) {
        return axios.get(API_URL + '/api/teachers/' + teacher._id, { headers: authHeader(teacher) });
    }

    /**
     *
     * Retrieves current user data from session storage
     */
    // getCurrentUser() {
    //     return JSON.parse(localStorage.getItem('user'));
    // }

    /**
     *
     * Check if current user is authenticated
     */
    // checkAuthenticated() {
    //     const user = localStorage.getItem('user');
    //     const authenticated = user ? true : false;
    //     console.log("Authentication status is:" + authenticated);
    //     return authenticated;
    // }
}

export default new AuthService();
