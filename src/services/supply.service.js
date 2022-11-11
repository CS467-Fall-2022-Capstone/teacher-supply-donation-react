import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Class for accessing/performing CRUD operations on teacher
 * records in backend
 */

class SupplyService {
    /**
     * Retrieves an array of supplies associated with a teacher
     * @param {*} teacher_id
     * @returns array of supply records
     */
    getSupplyRecord(teacher_id) {
        return axios.get(`${API_URL}/teachers/${teacher_id}/supplies`);
    }
}

export default new SupplyService();