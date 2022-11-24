import React, { useState, useEffect } from 'react';
import { Header, Segment, Label, Table, List } from 'semantic-ui-react';
import { useOutletContext, useLocation } from 'react-router-dom';
import TeacherService from '../../services/teacher.service';

function ArchiveDashboardPage() {
    const location = useLocation();
    const { teacher } = useOutletContext();
    const [archivedSupplies, setArchivedSupplies] = useState([]);
    const [archivedDonations, setArchivedDonations] = useState([]);

    useEffect(() => {
        async function loadArchivedData() {
            try {
                const response = await TeacherService.getArchivedData(teacher);
                if (response.status === 200) {
                    if (!ignore) {
                        console.log(response.data);
                        setArchivedSupplies(response.data.supplies);
                        setArchivedDonations(response.data.students);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        let ignore = false;
        loadArchivedData();
        return () => {
            // cleanup code to ensure no race conditions
            ignore = true;
        };
    }, [location.key]);

    return (
        <>
            <div className='dashboardHeader'>
                <Segment color='blue' raised>
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
            </div>

            <Segment raised color='blue'>
                <Label size='large' color='black' attached='top left'>
                    Archived Supplies List
                </Label>

                <Segment basic>
                    <Table inverted celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Item</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Quantity Needed
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Students / Donations
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {archivedSupplies.map((supply) => {
                                const donationData = archivedDonations.map(
                                    (student) => {
                                        let studentDonations = [];
                                        const donations = student.donations;
                                        donations.forEach((donation) => {
                                            if (
                                                donation.supply_id == supply._id
                                            ) {
                                                studentDonations.push(
                                                    `${
                                                        student.firstName +
                                                        ' ' +
                                                        student.lastName
                                                    } - ${
                                                        donation.quantityDonated
                                                    }`
                                                );
                                            }
                                        });
                                        return studentDonations;
                                    }
                                );
                                return (
                                    <Table.Row>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell>
                                            <List item={donationData} />
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Segment>
            </Segment>
        </>
    );
}

export default ArchiveDashboardPage;
