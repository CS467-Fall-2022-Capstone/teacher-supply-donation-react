import React from 'react';
// import Sidebar from '../../components/TeacherDashboard/DashboardLayout.js';
import SupplyTable from '../../components/TeacherDashboard/SupplyTable.js';

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
        <>
            <h1>Welcome</h1>
            <SupplyTable supplies={testData} />
        </>
    );
}

export default TeacherDashboardPage;
