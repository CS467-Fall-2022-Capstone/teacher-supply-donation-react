import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Class for accessing donations data from backend
 */

class DonationService {
    /**
     * Retrieves an existing public teacher record, which 
     * includes teacher_id, email, name, school, 
     * message, and a supplies array
     * @param {*} teacher_id 
     * @returns teacher record
     */
    getTeacherPublicRecord(teacher_id) {
        return axios.get(API_URL + '/teachers/' + teacher_id + '/public');
    }
}

export default new DonationService();
