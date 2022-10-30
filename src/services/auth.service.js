import axios from "axios";

const API_URL = process.env.REACT_APP_API;

class AuthService {
    /**
     * 
     * POST {email, password} & save response (and JWT token) to Session Storage
     */
    login(email, password) {
        return axios
            .post(API_URL + "/auth/signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    /**
     * 
     * Removes user data from session storage (including JWT)
     */
    logout() {
        localStorage.removeItem("user");
    }

    /**
    * 
    * Initial registration at POST {name, email, password}
    * If response successful, saves the user data including JWT in session storage
    */
    signup(name, email, password) {
        return axios.post(API_URL + "/auth/signup", {
            name,
            email,
            password
        })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    /**
      * 
      * Retrieves current user data from session storage
      */
    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));;
    }
}

export default new AuthService();