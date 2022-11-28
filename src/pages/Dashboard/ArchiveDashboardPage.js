import React, { useState, useEffect } from 'react';
import { Header, Segment, Label, Table } from 'semantic-ui-react';
import { useOutletContext, useLocation } from 'react-router-dom';
import TeacherService from '../../services/teacher.service';
import ArchiveRow from '../../components/TeacherDashboard/ArchiveRow';

function ArchiveDashboardPage() {
    const location = useLocation();
    const { teacher } = useOutletContext();
    const [archivedSupplies, setArchivedSupplies] = useState([]);

    useEffect(() => {
        async function loadArchivedData() {
            try {
                const response = await TeacherService.getArchivedData(teacher);
                if (response.status === 200) {
                    if (!ignore) {
                        setArchivedSupplies(response.data);
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
                                    Student / Donations
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {archivedSupplies.map((supply) => (
                                <ArchiveRow
                                    key={supply._id}
                                    archivedSupply={supply}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </Segment>
        </>
    );
}

export default ArchiveDashboardPage;
