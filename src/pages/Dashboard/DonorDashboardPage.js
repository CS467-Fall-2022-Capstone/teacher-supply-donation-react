import React from 'react';
import { Header } from 'semantic-ui-react';
import DonorTable from '../../components/TeacherDashboard/DonorTable';
import { useOutletContext } from 'react-router-dom';

function DonorDashboardPage() {
    const { students } = useOutletContext();

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge' textAlign='center'>
                    <Header.Content>Donors/Students List</Header.Content>
                </Header>
            </div>

            <DonorTable students={students} />
        </>
    );
}

export default DonorDashboardPage;
