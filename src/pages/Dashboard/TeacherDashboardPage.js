import React, { useState } from 'react';
import SupplyTable from '../../components/TeacherDashboard/SupplyTable.js';
import MetricsCards from '../../components/TeacherDashboard/MetricsCards';
import {
    Header,
    Segment,
    Button,
    Input,
    Label,
    Popup,
} from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useOutletContext } from 'react-router-dom';
import SupplyService from '../../services/supply.service';
import TeacherService from '../../services/teacher.service';
import ArchiveModal from '../../components/TeacherDashboard/ArchiveModal';
const clientDomain = window.origin; // http(s)://domain

function TeacherDashboardPage() {
    const { teacher, setTeacher, supplies, setSupplies, students, metrics } =
        useOutletContext();
    const [inEditMode, setInEditMode] = useState({
        status: false,
        supplyKey: null,
    });
    const [inAddMode, setInAddMode] = useState(false);
    const [donationUrl, setDonationUrl] = useState(
        clientDomain + '/donations/teachers/' + teacher.teacher_id
    );
    const [isCopied, setIsCopied] = useState(false);

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

    const onEdit = (supply_id) => {
        console.log(supply_id);
        setInEditMode({
            status: true,
            supplyKey: supply_id,
        });
    };

    const updateSupply = async (supply, supplyUpdate) => {
        try {
            let response = await SupplyService.updateSupplyRecord(
                supply._id,
                teacher.token,
                supplyUpdate
            );
            if (response.status === 200) {
                // find updatedSupply in supplies and replace with updates
                let updatedSupply = {
                    ...response.data,
                    _id: response.data.supply_id,
                };
                console.log(updatedSupply);
                updatedSupply.totalQuantityDonated =
                    supply.totalQuantityDonated;
                let newSupplies = supplies.map((supply) => {
                    if (supply._id === updatedSupply.supply_id) {
                        return updatedSupply;
                    } else {
                        return supply;
                    }
                });
                setSupplies(newSupplies);
            }
        } catch (err) {
            console.log('Error response received from Donations API');
            console.log(err);
            throw err;
        } finally {
            onCancel();
        }
    };

    const onSave = (supply, updates) => {
        if (updates.totalQuantityNeeded < supply.totalQuantityDonated) {
            // prevent request from even being made
            alert('Quantity needed cannot be less than number donated!');
        } else {
            const supplyUpdate = {
                totalQuantityNeeded: updates.totalQuantityNeeded,
            };
            if (supply.item !== updates.supplyName) {
                // only update item name if the value changed
                supplyUpdate.item = updates.supplyName;
            }
            console.log(supplyUpdate);
            updateSupply(supply, supplyUpdate);
        }
    };

    const onAdd = () => {
        setInAddMode(true);
    };

    const onSubmit = (item, totalQuantityNeeded) => {
        onCancel(); // reset add mode
        const newSupply = {
            item,
            totalQuantityNeeded,
        };
        return SupplyService.createSupplyRecord(teacher.token, newSupply);
    };

    const onCancel = () => {
        setInEditMode({
            status: false,
            supplyKey: null,
        });
        setInAddMode(false);
    };

    const togglePublish = async () => {
        const newPublishedVal = !teacher.isPublished;
        const update = { isPublished: newPublishedVal };
        try {
            const response = await TeacherService.updateTeacherRecord(
                teacher,
                update
            );
            if (response.status === 200) {
                setTeacher(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const preventUrlChange = (url) => {
        if (url !== donationUrl) {
            setDonationUrl(donationUrl);
        }
    };

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    const onArchive = () => {
        return TeacherService.archiveSupplyData(teacher);
    };

    return (
        <>
            <div className='dashboardHeader'>
                <Segment.Group raised>
                    <Segment color='blue'>
                        <Header size='huge' textAlign='center'>
                            <Header.Content>
                                Welcome {teacher.name}
                                <Header.Subheader>
                                    <strong>School:</strong> {teacher.school}
                                </Header.Subheader>
                                <Header.Subheader>
                                    <strong>Message to Donors:</strong>{' '}
                                    {teacher.message}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Segment>
                    <Segment textAlign='center'>
                        <Label size='large' color='black' attached='top left'>
                            Metrics
                        </Label>
                        <MetricsCards
                            numStudents={students.length}
                            numSuppliesWithDonation={
                                metrics.supplyWithDonations
                            }
                            numSupplies={supplies.length}
                            totalSumDonations={metrics.sumAllDonations}
                        />
                    </Segment>
                </Segment.Group>
            </div>

            <Segment color='blue' raised>
                <Label size='large' color='black' attached='top left'>
                    Publish/Share Donation URL
                </Label>
                <Segment.Group horizontal>
                    <div>
                        <Segment basic>
                            {teacher.isPublished ? (
                                <Button
                                    icon='lock'
                                    content='Unpublish List'
                                    labelPosition='left'
                                    negative
                                    onClick={() => togglePublish()}
                                />
                            ) : (
                                <Button
                                    icon='unlock'
                                    content='Publish List'
                                    labelPosition='left'
                                    positive
                                    onClick={() => togglePublish()}
                                />
                            )}
                        </Segment>
                    </div>
                    <Segment basic>
                        <Popup
                            inverted
                            size='large'
                            content='Copied!'
                            position='top center'
                            open={isCopied}
                            trigger={
                                <Input
                                    fluid
                                    labelPosition='left'
                                    type='text'
                                    action
                                    disabled={!teacher.isPublished}
                                    value={donationUrl}
                                    onChange={(e) =>
                                        preventUrlChange(e.target.value)
                                    }
                                >
                                    <Label
                                        content={
                                            teacher.isPublished
                                                ? 'Active'
                                                : 'Inactive'
                                        }
                                        icon={
                                            teacher.isPublished ? 'check' : 'x'
                                        }
                                        color={
                                            teacher.isPublished
                                                ? 'green'
                                                : 'red'
                                        }
                                    />
                                    <input />
                                    {teacher.isPublished ? (
                                        <CopyToClipboard
                                            text={donationUrl}
                                            onCopy={onCopyText}
                                        >
                                            <Button
                                                labelPosition='right'
                                                icon='copy'
                                                content='Copy'
                                                color='teal'
                                            />
                                        </CopyToClipboard>
                                    ) : (
                                        <Button
                                            disabled={true}
                                            labelPosition='right'
                                            icon='copy'
                                            content='Copy'
                                            color='teal'
                                        />
                                    )}
                                </Input>
                            }
                        />
                    </Segment>
                </Segment.Group>
            </Segment>

            <Segment raised color='blue'>
                <Label size='large' color='black' attached='top left'>
                    Supplies List
                </Label>
                <Segment basic>
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
                </Segment>
                <Segment basic textAlign='left'>
                    <ArchiveModal
                        metrics={metrics.supplyWithDonations}
                        supplies={supplies.length}
                        onArchive={onArchive}
                        setSupplies={setSupplies}
                    />
                </Segment>
            </Segment>
        </>
    );
}

export default TeacherDashboardPage;
