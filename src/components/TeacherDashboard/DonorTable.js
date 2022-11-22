import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import DonorRow from './DonorRow';
import CsvDownloader from 'react-csv-downloader';

function DonorTable({ students }) {

    // datas contains donors list that can be downloaded as .csv file
    const datas = [];
    students.forEach(student => {
        let studentData = {};
        studentData.lastName = student.lastName;
        studentData.firstName = student.firstName;           
        let formattedDonations = "";
        student.donations.forEach( donation => {
            let supply = donation.supply_id.item;
            let quantityDonated = donation.quantityDonated;
            if(formattedDonations.length > 0) {
                formattedDonations += " - ";
            }
            formattedDonations += `${supply} (${quantityDonated})`;
        });
        studentData.donations = formattedDonations;
        studentData.email = student.email;
        studentData.donation_code = student.donation_code;
        datas.push(studentData);
    });

    return (
        <Table inverted celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Donation Code</Table.HeaderCell>
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
                        <div style={{height: '20px'}} >
                            <CsvDownloader
                                filename="donorsList"
                                extension=".csv"
                                separator=","
                                wrapColumnChar=""
                                datas={datas}
                                text="Download to .csv"
                                style={{ backgroundColor: 'lightgray'}} 
                            />   
                        </div>                        
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default DonorTable;
