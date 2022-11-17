import React from 'react';
import { Table } from 'semantic-ui-react';

function DonorRow({ student }) {
    let donations = student.donations;
    console.log(donations); // an array of strings in format "supply - quantityDonated"
    let donationsList = donations.map(donation => {
        return <ul>{donation}</ul>
    });

    return (
        <Table.Row>
            <Table.Cell>{student.firstName}</Table.Cell>
            <Table.Cell>{student.lastName}</Table.Cell>
            <Table.Cell>{student.student_id}</Table.Cell>
            <Table.Cell>
                <ul>
                    {donationsList}
                </ul>
            </Table.Cell>
        </Table.Row>
    );
}

export default DonorRow;
