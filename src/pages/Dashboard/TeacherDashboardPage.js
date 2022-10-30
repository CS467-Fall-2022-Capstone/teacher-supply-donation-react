import React, { useState, useEffect } from 'react';
import SupplyTable from '../../components/TeacherDashboard/SupplyTable.js';
import MetricsCards from '../../components/TeacherDashboard/MetricsCards';
import { Header } from 'semantic-ui-react';

function TeacherDashboardPage() {
    const [supplies, setSupplies] = useState([]);
    const [inEditMode, setInEditMode] = useState({
        status: false,
        supplyKey: null,
    });
    const [inAddMode, setInAddMode] = useState(false);

    const loadSupplies = async () => {
        // TODO: implement data fetch
        // For Testing, delete once back-end is integrated
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
        setSupplies(testData);
    };
    // For Testing, delete once back-end is integrated
    const teacherName = 'John Doe';
    const schoolName = 'BinaryCode High School';

    const onDelete = async (id) => {
        // TODO: implement /DELETE supply
        setSupplies(supplies.filter((supply) => supply._id !== id));
    };

    const onEdit = (supply) => {
        // TODO: implement edit
        console.log(supply._id);
        setInEditMode({
            status: true,
            supplyKey: supply._id,
        });
    };

    const updateSupply = async (id, supplyUpdate) => {
        // TODO: implement fetch PATCH
        // reset edit mode
        console.log(id);
        console.log(supplyUpdate);
        onCancel();
        // update table with new values
        loadSupplies();
    };

    const onSave = (id, item, qty) => {
        const update = {
            item: item,
            totalQtyNeeded: qty,
        };
        console.log(update);
        updateSupply(id, update);
    };

    const onAdd = () => {
        setInAddMode(true);
    };

    const onSubmit = (itemName, qtyNeeded) => {
        // TODO: POST request to create Supply
        // use teacherId as param to create new Supply and push
        // the new supply to Teacher.supplies array

        // Test Data
        const id = supplies.length;
        const newSupply = {
            _id: id,
            item: itemName,
            totalQtyNeeded: qtyNeeded,
            qtyDonated: 0,
        };
        onCancel(); // reset add mode
        setSupplies([...supplies, newSupply]);
    };

    const onCancel = () => {
        setInEditMode({
            status: false,
            supplyKey: null,
        });
        setInAddMode(false);
    };

    useEffect(() => {
        loadSupplies();
    }, []);

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge' textAlign='center'>
                    <Header.Content>
                        Welcome {teacherName}
                        <Header.Subheader>{schoolName}</Header.Subheader>
                    </Header.Content>
                </Header>
            </div>
            <div className='metrics'>
                <MetricsCards />
            </div>

            <SupplyTable
                supplies={supplies}
                inEditMode={inEditMode}
                inAddMode={inAddMode}
                onDelete={onDelete}
                onEdit={onEdit}
                onAdd={onAdd}
                onSubmit={onSubmit}
                onSave={onSave}
                onCancel={onCancel}
            />
        </>
    );
}

export default TeacherDashboardPage;
