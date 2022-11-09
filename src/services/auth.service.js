import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_BACKEND_URL;

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
     * Send Google User Info to backend and return authenticated user
     */

    async googleLogin(googleToken) {
        try {
            // Get user info from Google
            const googleUser = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${googleToken.access_token}`,
                    },
                }
            );
            // Send to back-end for authentication
            const expressResponse = await axios.post(
                `${API_URL}/auth/google`,
                googleUser.data
            );

            if (expressResponse.status === 200) {
                return expressResponse.data;
            }
        } catch (err) {
            throw err;
        }
    }
    /**
     * Functions for accessing sending requests to the backend
     */
    createAuthRequest(teacher) {
        return axios.get(API_URL + '/api/teachers/' + teacher._id, {
            headers: authHeader(teacher),
        });
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
