import React from 'react';
import { Table, Header, Button, Icon } from 'semantic-ui-react';
import DonorRow from './DonorRow';
import { useOutletContext } from 'react-router-dom';
import DonationService from '../../services/donations.service';
function DonorTable({ students }) {

    const { teacher } = useOutletContext();

    const handleDownloadCsv = () => {
        DonationService.handleDownloadCsv(teacher.teacher_id);
    };

    return (
        <Table inverted celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Student ID</Table.HeaderCell>
                    <Table.HeaderCell>Supplies Donated</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {students.map((student, i) => (
                    <DonorRow key={i} student={student} />
                ))}
            </Table.Body>
            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell
                        textAlign='center'
                        colSpan='2'
                        content={
                            <Header size='small' inverted color='blue'>
                                {students.length} Students
                            </Header>
                        }
                    />
                    <Table.HeaderCell />
                    <Table.HeaderCell>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            onClick={() => handleDownloadCsv()}
                        >
                            <Icon name='download' />
                            Download to .csv
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default DonorTable;
