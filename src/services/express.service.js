import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

class ExpressService {
    // Ping /ping route of server 
    // returns true boolean value if server is running
    pingServer() {
        return axios.get(`${API_URL}/ping`);
    }
}

export default new ExpressService();
