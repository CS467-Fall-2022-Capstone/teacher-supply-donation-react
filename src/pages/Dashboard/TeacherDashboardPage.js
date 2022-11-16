import React, { useState } from 'react';
import SupplyTable from '../../components/TeacherDashboard/SupplyTable.js';
import MetricsCards from '../../components/TeacherDashboard/MetricsCards';
import { Header } from 'semantic-ui-react';
import { useOutletContext } from 'react-router-dom';
import SupplyService from '../../services/supply.service';

function TeacherDashboardPage() {
    const { teacher, supplies, setSupplies, students, metrics } =
        useOutletContext();
    const [inEditMode, setInEditMode] = useState({
        status: false,
        supplyKey: null,
    });
    const [inAddMode, setInAddMode] = useState(false);

    const onDelete = async (supply_id) => {
        try {
            const response = await SupplyService.deleteSupplyRecord(
                supply_id,
                teacher.token
            );
            if (response.status === 204) {
                const newSupplies = supplies.filter(
                    (supply) => supply._id !== supply_id
                );
                setSupplies(newSupplies);
            }
        } catch (err) {
            console.log('Error response received from Donations API');
            console.log(err);
            throw err;
        }
    };

    const onEdit = async (supply) => {
        setInEditMode({
            status: true,
            supplyKey: supply._id,
        });
    };

    const updateSupply = async (supply_id, supplyUpdate) => {
        try {
            let response = await SupplyService.updateSupplyRecord(
                supply_id,
                teacher.token,
                supplyUpdate
            );
            if (response.status === 200) {
                let updatedSupply = response.data;
                // find updatedSupply in supplies and update info
                let supplyToUpdateIndex = supplies.findIndex(
                    (el) => el._id === supply_id
                );
                supplies[supplyToUpdateIndex].item = updatedSupply.item;
                supplies[supplyToUpdateIndex].totalQuantityNeeded =
                    updatedSupply.totalQuantityNeeded;
                setSupplies(supplies);
            }
        } catch (err) {
            console.log('Error response received from Donations API');
            console.log(err);
            throw err;
        }
        onCancel();
    };

    const onSave = (supply_id, item, totalQuantityNeeded) => {
        const supplyUpdate = {
            item,
            totalQuantityNeeded,
        };
        console.log(supplyUpdate);
        updateSupply(supply_id, supplyUpdate);
    };

    const onAdd = () => {
        setInAddMode(true);
    };

    const onSubmit = async (item, totalQuantityNeeded) => {
        const newSupply = {
            item,
            totalQuantityNeeded,
        };
        return await SupplyService.createSupplyRecord(teacher.token, newSupply);
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
                        Welcome {teacher.name}
                        {teacher.school && (
                            <Header.Subheader>
                                School: {teacher.school}
                            </Header.Subheader>
                        )}
                        {teacher.message && (
                            <Header.Subheader>
                                Message to Donors: {teacher.message}
                            </Header.Subheader>
                        )}
                    </Header.Content>
                </Header>
            </div>
            <div className='metrics'>
                <MetricsCards
                    numStudents={students.length}
                    numSuppliesWithDonation={metrics.supplyWithDonations}
                    numSupplies={supplies.length}
                    totalSumDonations={metrics.sumAllDonations}
                />
            </div>

            <SupplyTable
                supplies={supplies}
                setSupplies={setSupplies}
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
