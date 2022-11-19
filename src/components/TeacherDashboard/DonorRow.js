import React from 'react';
import { Table, List } from 'semantic-ui-react';

function DonorRow({ student }) {
    const formattedDonations = student.donations.map((donation, i) => {
        let supply = donation.supply_id.item;
        let quantityDonated = donation.quantityDonated;
        return `${supply} - ${quantityDonated}`;
    });

    return (
        <Table.Row>
            <Table.Cell>{student.firstName}</Table.Cell>
            <Table.Cell>{student.lastName}</Table.Cell>
            <Table.Cell>{student._id}</Table.Cell>
            <Table.Cell>
                <List items={formattedDonations} />
            </Table.Cell>
        </Table.Row>
    );
}

export default DonorRow;
