import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;
//const API_URL = process.env.REACT_APP_API;

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

    /**
     * Create Student record
     * @param {*}
     * @returns student record & donations
     */
    createNewStudentRecord(studentInfo) {
        return axios.post(`${API_URL}/students/`, studentInfo);
    }

    /**
     * Retrieves Student record including their existing donations
     * @param {*} student_id
     * @returns student record & donations
     */
    getStudentRecord(student_id) {
        return axios.get(`${API_URL}/students/${student_id}`);
    }

    /**
     * Retrieves Student's objectId value
     * @param {*} donation_code
     * @returns student_id: student._id
     */
    getStudentByDonationCode(donation_code) {
        return axios.get(`${API_URL}/students/${donation_code}/donations`)
    }

    /**
     * Sends an object representing students donations toward class supply list
     * @param {} student_id
     * @param {*} donations
     * @returns
     */
    updateStudentDonations(student_id, donations) {
        return axios({
            method: 'post',
            url: `${API_URL}/donations/${student_id}`,
            data: donations,
        });
    }

    getStudentDonations(student_id) {
        return axios.get(`${API_URL}/students/${student_id}/donations`);
    }
}

export default new DonationService();
