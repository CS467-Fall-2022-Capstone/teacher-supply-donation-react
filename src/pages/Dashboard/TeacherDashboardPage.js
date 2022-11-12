import React, { useState, useEffect } from 'react';
import SupplyTable from '../../components/TeacherDashboard/SupplyTable.js';
import MetricsCards from '../../components/TeacherDashboard/MetricsCards';
import { Header } from 'semantic-ui-react';
import { useAuth } from '../../services/AuthProvider';
import SupplyService from '../../services/supply.service';
import TeacherService from '../../services/teacher.service.js';

function TeacherDashboardPage() {
    const { teacher } = useAuth();
    const teacher_id = teacher.teacher_id;
    const teacherName = teacher.name;
    const teacher_token = teacher.token;
    
    const [supplies, setSupplies] = useState([]);
    const [school, setSchool] = useState('Enter your school');
    const [message, setMessage] = useState('Enter your message');
    const [inEditMode, setInEditMode] = useState({
        status: false,
        supplyKey: null,
    });
    const [inAddMode, setInAddMode] = useState(false);

    useEffect(() => {
        const loadTeacherInfo = async () => {
            try {
                console.log('inside useEffect');
                let response = await TeacherService.getTeacherRecord(teacher_id, teacher_token);
                if (response.status === 200) {                    setSupplies(response.data.supplies);
                    setSchool(response.data.teacher.school);
                    setMessage(response.data.teacher.message);
                }
            } catch (err) {
                console.log("Error response received from Donations API")
                console.log(err);
                throw err;
            }
        };
        loadTeacherInfo();
    }, []);
    
    const onDelete = async (supply_id) => {
        try {
            let response = await SupplyService.deleteSupplyRecord(supply_id,teacher_token);
            if (response.status === 204) {
                let newSupplies = supplies.filter(supply => supply.supply_id !== supply_id);
                setSupplies(newSupplies);
            }
        } catch (err) {
            console.log("Error response received from Donations API")
            console.log(err);
            throw err;
        }
        
    };

    const onEdit = async(supply) => {
        setInEditMode({
            status: true,
            supplyKey: supply.supply_id,
        });
    };

    const updateSupply = async (supply_id, supplyUpdate) => {
        console.log(supply_id);
        console.log(supplyUpdate);
        console.log(teacher_token);
        try {
            let response = await SupplyService.updateSupplyRecord(supply_id,teacher_token, supplyUpdate);
            console.log(response);
            if (response.status === 200) {
                let updatedSupply = response.data;  
                // find updatedSupply in supplies and update info
                let supplyToUpdateIndex = supplies.findIndex(el => el.supply_id === supply_id);
                supplies[supplyToUpdateIndex].item = updatedSupply.item;
                supplies[supplyToUpdateIndex].totalQuantityNeeded = updatedSupply.totalQuantityNeeded;
                setSupplies(supplies);
            }
        } catch (err) {
            console.log("Error response received from Donations API")
            console.log(err);
            throw err;
        }
        onCancel();
    };

    const onSave = (supply_id, item, totalQuantityNeeded) => {
        const supplyUpdate = {
            item,
            totalQuantityNeeded
        };
        console.log(supplyUpdate);
        updateSupply(supply_id, supplyUpdate);
    };

    const onAdd = () => {
        setInAddMode(true);
    };

    const onSubmit = (item, totalQuantityNeeded) => {
        // TODO: POST request to create Supply
        // use teacherId as param to create new Supply and push
        // the new supply to Teacher.supplies array

        // Test Data
        const newSupply = {
            item,
            totalQuantityNeeded,
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
                        <Header.Subheader>School: {school}</Header.Subheader>
                        <Header.Subheader>Message to Donors: {message}</Header.Subheader>
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
