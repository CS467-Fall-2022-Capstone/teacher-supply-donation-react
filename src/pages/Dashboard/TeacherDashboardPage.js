import React, { useState, useEffect } from 'react';
import SupplyTable from '../../components/TeacherDashboard/SupplyTable.js';
import MetricsCards from '../../components/TeacherDashboard/MetricsCards';
import { Header } from 'semantic-ui-react';
import { useAuth } from '../../services/AuthProvider';
import SupplyService from '../../services/supply.service';

function TeacherDashboardPage() {
    const { teacher } = useAuth();
    const teacher_id = teacher.teacher_id;
    const teacherName = teacher.name;
    const schoolName = teacher.school;
    console.log(teacher);
    const [supplies, setSupplies] = useState([]);
    const [inEditMode, setInEditMode] = useState({
        status: false,
        supplyKey: null,
    });
    const [inAddMode, setInAddMode] = useState(false);

    useEffect(() => {
        const loadSupplies = async () => {
            try {
                console.log('inside useEffect');
                let response = await SupplyService.getSupplyRecord(teacher_id);
                if (response.status === 200) {
                    console.log("RECEIVED DATA: " + JSON.stringify(response.data));
                    setSupplies(response.data.supplies);
                }
            } catch (err) {
                console.log("Error response received from Donations API")
                console.log(err);
                throw err;
            }
        };
        loadSupplies();
    }, [teacher_id]);
    
    const onDelete = async (id) => {
        // TODO: implement /DELETE supply
        setSupplies(supplies.filter((supply) => supply._id !== id));
    };

    const onEdit = (supply) => {
        // TODO: implement edit
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
        //loadSupplies();
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
        const newSupply = {
            item: itemName,
            totalQuantityNeeded: qtyNeeded,
            quantityDonated: 0,
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
