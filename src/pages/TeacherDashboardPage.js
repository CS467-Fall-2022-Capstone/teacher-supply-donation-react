import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import SideBar from '../components/TeacherDashboard/SideBar.js';
import SupplyTable from '../components/TeacherDashboard/SupplyTable.js';


function TeacherDashboardPage() {
    const testData = [
        {
            _id: 1,
            item: 'Pencils',
            totalQtyNeeded: 10,
            qtyDonated: 5,
        },
        {
            _id: 2,
            item: 'Tissue Boxes',
            totalQtyNeeded: 5,
            qtyDonated: 1,
        },
        {
            _id: 3,
            item: 'Scissors',
            totalQtyNeeded: 15,
            qtyDonated: 0,
        },
    ];

    return (
        <Grid columns={2}>
            <Grid.Column>
                <SideBar />
            </Grid.Column>
            <Grid.Column width={8} >
                <Header size='huge'>
                    Dashboard
                </Header>
                <SupplyTable supplies={testData} />
            </Grid.Column>
        </Grid>
    );
}

export default TeacherDashboardPage;
