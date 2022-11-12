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
    /**
     * Deletes a supply associated with a teacher
     * @param supply_id, @param teacher_token
     */
    deleteSupplyRecord(supply_id, teacher_token) {
        console.log(supply_id);
        console.log(teacher_token);
        return axios.delete(`${API_URL}/supplies/${supply_id}`,
            {
                headers: {
                    Authorization: `Bearer ${teacher_token}`,
                }        
            }
        );
    }
}

export default new SupplyService();