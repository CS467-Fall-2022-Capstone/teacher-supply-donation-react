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
    
    const onDelete = async (s_id) => {
        // TODO: implement /DELETE supply
        try {
            let response = await SupplyService.deleteSupplyRecord(s_id,teacher_token);
            if (response.status === 204) {
                let newSupplies = supplies.filter(supply => supply.supply_id !== s_id);
                setSupplies(newSupplies);
            }
        } catch (err) {
            console.log("Error response received from Donations API")
            console.log(err);
            throw err;
        }
        
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

    const onSave = (supply_id, item, totalQuantityNeeded) => {
        const update = {
            item,
            totalQuantityNeeded
        };
        console.log(update);
        updateSupply(supply_id, update);
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
