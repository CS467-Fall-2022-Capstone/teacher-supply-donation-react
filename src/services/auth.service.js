import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;


class AuthService {
    /**
     * 
     * POST {email, password} & save response (and JWT token) to Session Storage
     */
    async login(email, password) {
        try {
            let response = await axios
                .post(API_URL + "/auth/signin", {
                    email,
                    password
                })
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        } catch (err) {
            throw err;
        }
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

    async signup(name, email, password) {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                name,
                email,
                password,
            })

            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log("Data set in local storage")
            }
            console.log(response);
            return response.data;
        } catch (err) {
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

    /*
    //EARLIER chained version of login - refactored to async
    login(email, password) {
        return axios
            .post(API_URL+"/auth/signin", {
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
    */
}

export default new AuthService();