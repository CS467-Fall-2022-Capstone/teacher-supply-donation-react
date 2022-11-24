import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

class StudentService {
    /**
     * Deletes a student
     * @param student_id
     */
    deleteStudentRecord(student_id) {
        console.log('inside student.service');
        return axios.delete(`${API_URL}/students/${student_id}`);
    }

        /**
     * Updates a supply associated with a teacher
     * Only the item or totalQuantityNeeded can be updated
     * @param supply_id, @param teacher_token, @param updatedSupplyData
     */
    updateStudentRecord(student_id, updatedStudentData) {
        return axios({
            method: 'patch',
            url: `${API_URL}/students/${student_id}`,
            data: updatedStudentData
        });
    }

}

export default new StudentService();