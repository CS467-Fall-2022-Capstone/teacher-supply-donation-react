import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';

/**
 * Functions for accessing sending requests to the backend
 */


class UserService {
    getTeacherDashboard() {
        const teacher = AuthService.getCurrentUser();
        return axios.get(API_URL + '/api/teachers/' + teacher._id, { headers: authHeader() });
    }


}

export default new UserService();