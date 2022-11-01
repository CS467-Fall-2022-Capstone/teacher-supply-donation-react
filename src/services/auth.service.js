import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;


class AuthService {
    /**
     * 
     * POST {email, password} & save response (and JWT token) to Session Storage
     */
    async login(email, password) {
        try {
            //clear any prior user data in local storage
            localStorage.removeItem("user");

            //For testing
            //console.log(`AuthService data sending: Email: ${email}, Pass: ${password}`);

            let response = await axios
                .post(`${API_URL}/auth/login`, {
                    email,
                    password
                })
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log("User logged in: Data set in local storage");
            } else {
                //clear any prior user data from local storage
                localStorage.removeItem("user");
            }
            return response;
        } catch (err) {
            localStorage.removeItem("user");
            throw err;
        }
    }

    /**
     * 
     * Removes user data from session storage (including JWT)
     */
    logout() {
        localStorage.removeItem("user");
        console.log("Local storage cleared. User logged out");
    }

    /**
    * 
    * Initial registration at POST {name, email, password}
    * If response successful, saves the user data including JWT in session storage
    */

    async signup(name, email, password) {
        try {

            const response = await axios.post(`${API_URL}/auth/signup`, {
                name,
                email,
                password,
            })

            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log("User signed up and logged in: Data set in local storage");
            } else {
                //clear any prior user data from local storage
                localStorage.removeItem("user");
            }
            console.log(response.data);
            return response;
        } catch (err) {
            //if local storage had a user at this point, clear it
            localStorage.removeItem("user");
            throw err;
        }
    }

    /**
      * 
      * Retrieves current user data from session storage
      */
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    /**
     * 
     * Check if current user is authenticated
     */
    checkAuthenticated() {
        const user = localStorage.getItem('user');
        const authenticated = user ? true : false;
        console.log("Authentication status is:" + authenticated);
        return authenticated;
    }
}

export default new AuthService();