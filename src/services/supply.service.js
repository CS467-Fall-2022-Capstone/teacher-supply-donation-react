import axios from 'axios';
//const API_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = process.env.REACT_APP_API;

/**
 * Class for accessing/performing CRUD operations on teacher
 * records in backend
 */

class SupplyService {
    /**
     * Retrieves an array of supplies associated with a teacher
     * @param teacher_id
     * @returns array of supply records
     */
    getSupplyRecord(teacher_id) {
        return axios.get(`${API_URL}/teachers/${teacher_id}/public`);
    }

    /**
     * Creates a supply associated with a teacher
     * @param teacher_token
     */
    createSupplyRecord(teacher_token, newSupply) {
        return axios({
            method: 'post',
            url: `${API_URL}/supplies`,
            headers: {
                Authorization: `Bearer ${teacher_token}`,
            },
            data: newSupply
        });
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
    /**
     * Updates a supply associated with a teacher
     * Only the item or totalQuantityNeeded can be updated
     * @param supply_id, @param teacher_token, @param updatedSupplyData
     */
    updateSupplyRecord(supply_id, teacher_token, updatedSupplyData) {
        return axios({
            method: 'patch',
            url: `${API_URL}/supplies/${supply_id}`,
            headers: {
                Authorization: `Bearer ${teacher_token}`,
            },
            data: updatedSupplyData
        });
    }
}

export default new SupplyService();