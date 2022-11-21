import React from 'react';
import { Table } from 'semantic-ui-react';
import SupplyRowSimple from './SupplyRowSimple';

function SupplyTableSimple({ supplies }) {
    return (
        <Table basic='very' celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Needed</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Donated</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {supplies.map((supply) => (
                    <SupplyRowSimple key={supply._id} supply={supply} />
                ))}
            </Table.Body>
        </Table>
    );
}

export default SupplyTableSimple;
