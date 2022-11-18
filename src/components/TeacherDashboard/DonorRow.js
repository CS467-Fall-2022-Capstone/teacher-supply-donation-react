import React from 'react';
import { Table } from 'semantic-ui-react';

function DonorRow({ student }) {
    const formattedDonations = student.donations.map((donation, i) => {
        let supply = donation.supply_id.item;
        let quantityDonated = donation.quantityDonated;
        return <li key={i}>{supply} - {quantityDonated}</li>;
    });

    return (
        <Table.Row>
            <Table.Cell>{student.firstName}</Table.Cell>
            <Table.Cell>{student.lastName}</Table.Cell>
            <Table.Cell>{student._id}</Table.Cell>
            <Table.Cell>
                <ul>{formattedDonations}</ul>
            </Table.Cell>
        </Table.Row>
    );
}

export default DonorRow;
