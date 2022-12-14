import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

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
     * Finds Student record by Donation and return 200 if found
     * @param {*} donation_code
     * @returns status 200
     */
    getStudentByDonationCode(donation_code) {
        return axios(`${API_URL}/students/donation_code/${donation_code}`);
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

    sendEmailDonationCode(email, teacher_name) {
        let req_body = {
            email,
            teacher_name,
        };
        return axios({
            method: 'post',
            url: `${API_URL}/emailDonationId`,
            data: req_body,
        });
    }

    sendEmailAfterSubmitDonation(teacher, student, studentDonations) {
        let req_body = {
            email: student.email,
            studentName: student.firstName + ' ' + student.lastName,
            donationCode: student.donationCode,
            teacherName: teacher.name,
            studentDonations,
        };
        return axios({
            method: 'post',
            url: `${API_URL}/emailAfterSubmitDonation`,
            data: req_body,
        });
    }
}
export default new DonationService();
