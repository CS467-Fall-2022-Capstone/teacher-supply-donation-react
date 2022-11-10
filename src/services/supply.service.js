import axios from 'axios';
const API_URL = process.env.REACT_APP_API;

/**
 * Class for accessing/performing CRUD operations on teacher
 * records in backend
 */

class SupplyService {
    /**
     * Retrieves a supply record
     * @param {*} supply_id 
     * @returns supply record
     */
    getSupplyRecord(supply_id) {
        return axios.get(`${API_URL}/supplies/${supply_id}`);
    }
}

export default new SupplyService();