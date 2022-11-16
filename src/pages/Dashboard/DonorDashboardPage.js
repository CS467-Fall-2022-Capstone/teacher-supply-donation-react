import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import DonorTable from '../../components/TeacherDashboard/DonorTable';
import { useAuth } from '../../services/AuthProvider';
import teacherService from '../../services/teacher.service';

function DonorDashboardPage() {
    const { teacher } = useAuth();
    const teacher_id = teacher.teacher_id;
    const teacher_token = teacher.token;

    const [students, setStudents] = useState([]);
    const school = 'cool school';

    useEffect(() => {
        const loadStudentInfo = async () => {
            try {
                console.log('inside useEffect in DonorDashboardPage');
                let response = await teacherService.getStudents(teacher_id, teacher_token);
                if (response.status === 200) {
                    response.data.students.forEach( student => {
                        // student.donations is array of Donation objects
                        // convert to array of strings 'item - quantityDonated'
                        // Example: ['scissors - 3', 'tissue box - 1']
                        let donations = student.donations;
                        let formattedDonations = [];
                        donations.forEach(donation => {
                            console.log(donation);
                            let supply = donation.supply_id.item;
                            let quantityDonated = donation.quantityDonated;
                            let el = supply + " - " + quantityDonated + " ";
                            formattedDonations.push(el);
                        });
                        console.log(formattedDonations);
                        student.donations = [];
                        student.donations = formattedDonations;
                    });
                    setStudents(response.data.students);
                }
            } catch (err) {
                console.log("Error response received from Donations API")
                console.log(err);
                throw err;
            }
        };
        loadStudentInfo();
    }, []);

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge' textAlign='center'>
                    <Header.Content>
                        Donors/Students List
                        <Header.Subheader>{school}</Header.Subheader>
                    </Header.Content>
                </Header>
            </div>

            <DonorTable students={students} />
        </>
    );
}

export default DonorDashboardPage;
