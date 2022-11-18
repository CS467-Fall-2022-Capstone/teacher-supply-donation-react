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

    const onEdit = async (supply) => {
        setInEditMode({
            status: true,
            supplyKey: supply._id,
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
                let updatedSupply = response.data;
                updatedSupply.totalQtyDonated = supply.totalQtyDonated;
                let supplyToUpdateIndex = supplies.findIndex(
                    (el) => el._id === supply._id
                );
                supplies[supplyToUpdateIndex] = updatedSupply;
                setSupplies(supplies);
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
        if (updates.totalQuantityNeeded < supply.totalQtyDonated) {
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

    return (
        <>
            <div className='dashboardHeader'>
                <Segment.Group raised>
                    <Segment color='orange'>
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
                    <Segment color='grey' textAlign='center'>
                        <Label size='large' color='blue' attached='top left'>
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

            <Segment color='orange' raised>
                <Label size='large' color='blue' attached='top left'>
                    Publish/Share Donation URL
                </Label>
                <Segment.Group basic horizontal>
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
                                    <Button
                                        disabled={!teacher.isPublished}
                                        labelPosition='right'
                                        icon='send'
                                        content='Send'
                                        color='blue'
                                    />
                                </Input>
                            }
                        />
                    </Segment>
                </Segment.Group>
            </Segment>

            <Segment raised color='orange'>
                <Label size='large' color='blue' attached='top left'>
                    Supplies List
                </Label>
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
        </>
    );
}

export default TeacherDashboardPage;
