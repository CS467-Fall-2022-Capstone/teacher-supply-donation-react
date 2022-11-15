import axios from 'axios';
import authHeader from './auth-header'
const API_URL = process.env.REACT_APP_BACKEND_URL;


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

    /**
     * Retrieves an existing protected teacher record, which
     * includes teacher_id, email, name, school,
     * message, a supplies array, and a students array
     * @param {*} teacher_id
     * @returns teacher record
     */
    getTeacherRecord(teacher_id, teacher_token) {
        return axios.get(`${API_URL}/teachers/${teacher_id}`, {
            headers: {
                Authorization: `Bearer ${teacher_token}`,
            },
        });
    }

    /**
     * Update an existing protected teacher record, which
     * includes teacher_id, email, name, school, and
     * message.  Password is optional
     * @param {*} teacher
     * @returns Teacher.toAuthJSON() document
     */
    updateTeacherRecord(teacher, updates) {
        return axios.put(`${API_URL}/teachers/${teacher.teacher_id}`, updates, {
            headers: authHeader(teacher),
        });
    }
}

export default new TeacherService();
