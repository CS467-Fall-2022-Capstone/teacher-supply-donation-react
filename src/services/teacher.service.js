import axios from 'axios';
const API_URL = process.env.REACT_APP_API;

/**
 * Class for accessing/performing CRUD operations on teacher
 * records in backend
 */

class TeacherService {
    /**
     * Retrieves an existing public teacher record, which 
     * includes teacher_id, email, name, school, 
     * message, and a supplies array
     * @param {*} teacher_id 
     * @returns teacher record
     */
    getTeacherPublicRecord(teacher_id) {
        return axios.get(`${API_URL}/teachers/${teacher_id}/public`);
    }
}

export default new TeacherService();