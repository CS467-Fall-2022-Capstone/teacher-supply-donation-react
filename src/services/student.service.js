import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

class StudentService {
    /**
     * Deletes a student
     * @param student_id
     */
    deleteStudentRecord(student_id) {
        return axios.delete(`${API_URL}/students/${student_id}`);
    }

    /**
     * Updates student record
     * @param student_id, @param updatedStudentData 
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
