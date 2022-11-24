import React, { useState } from 'react';
import { Header } from 'semantic-ui-react';
import DonorTable from '../../components/TeacherDashboard/DonorTable';
import { useOutletContext } from 'react-router-dom';
import StudentService from '../../services/student.service';
import { useNavigate } from 'react-router-dom'

function DonorDashboardPage() {
    const navigate = useNavigate();
    const { students, setStudents } = useOutletContext();
    const [inEditMode, setInEditMode] = useState({
        status: false,
        studentKey: null,
    });

    const onEdit = (student_id) => {
        console.log(student_id);
        setInEditMode({
            status: true,
            studentKey: student_id,
        });
    };

    const onSave = (student, updates) => {
            const studentUpdate = {
                firstName: updates.firstName,
                lastName: updates.lastName,
                email: updates.email
            };
            // only update item name if the value changed
            if (student.firstName !== updates.firstName) {          
                studentUpdate.firstName = updates.firstName;
            }
            if (student.lastName !== updates.firstName) {
                studentUpdate.firstName = updates.firstName;
            }
            if (student.email !== updates.email) {
                studentUpdate.firstName = updates.firstName;
            }
            console.log(studentUpdate);
            updateStudent(student, studentUpdate);

    };

    const updateStudent = async (student, studentUpdate) => {
        try {
            let response = await StudentService.updateStudentRecord(
                student._id,
                studentUpdate
            );
            if (response.status === 200) {
                // find updatedStudent in students and replace with updates
                let updatedStudent = response.data;
                updatedStudent.firstName =
                    student.lastName;
                let newStudents = students.map((student) => {
                    if (student._id === updatedStudent._id) {
                        return updatedStudent;
                    } else {
                        return student;
                    }
                });
                setStudents(newStudents);
            }
        } catch (err) {
            console.log('Error response received from Students API');
            console.log(err);
            throw err;
        } finally {
            onCancel();
            navigate('/teachers/dashboard/donors')
        }
    };

    const onCancel = () => {
        setInEditMode({
            status: false,
            studentKey: null,
        });
    };

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge' textAlign='center'>
                    <Header.Content>Donors/Students List</Header.Content>
                </Header>
            </div>

            <DonorTable
                students={students} 
                setStudents={setStudents}
                inEditMode={inEditMode}
                onEdit={onEdit}
                onSave={onSave}
                onCancel={onCancel}
            />
        </>
    );
}

export default DonorDashboardPage;
