import React from 'react';
import { Header } from 'semantic-ui-react';
import DonorTable from '../../components/TeacherDashboard/DonorTable';

function DonorDashboardPage() {
    // Test data, delete once back-end integrated
    const students = [
        {
            firstName: 'Sean',
            lastName: 'Park',
            donation_id: 'someId',
            donations: ['Tissue Paper', 'Pencils'],
        },
        {
            firstName: 'Alice',
            lastName: 'Fisher',
            donation_id: 'someId',
            donations: ['Tissue Paper', 'Pencils'],
        },
        {
            firstName: 'Joel',
            lastName: 'Swenndal',
            donation_id: 'someId',
            donations: ['Tissue Paper', 'Pencils'],
        },
    ];
    const schoolName = 'BinaryCode High School';

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge' textAlign='center'>
                    <Header.Content>
                        Donors/Students List
                        <Header.Subheader>{schoolName}</Header.Subheader>
                    </Header.Content>
                </Header>
            </div>

            <DonorTable students={students} />
        </>
    );
}

export default DonorDashboardPage;
