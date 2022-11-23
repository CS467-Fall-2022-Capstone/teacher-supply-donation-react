import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Class for accessing donations data from backend
 */
class StudentService {
    /**
     * Updates a Student's information
     * @param {*}
     * @returns updated Student record
     */
    updateStudentInfo(student_id, studentUpdates) {
        return axios.patch(`${API_URL}/students/${student_id}`, studentUpdates);
    }

    /**
     * Retrieves Student record including their existing donations
     * @param {*} student_id
     * @returns student record & donations
     */
    getStudentRecord(student_id) {
        return axios.get(`${API_URL}/students/${student_id}`);
    }
}
export default new StudentService();
