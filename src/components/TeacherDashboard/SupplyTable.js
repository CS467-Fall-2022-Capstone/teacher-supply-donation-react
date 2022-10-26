import React from 'react';
import { Table } from 'semantic-ui-react';
import SupplyRow from './SupplyRow';

function SupplyTable({ supplies }) {
    return (
        <Table inverted celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Needed</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Donated</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {supplies.map((supply, i) => (
                    <SupplyRow supply={supply} key={i} />
                ))}
            </Table.Body>
        </Table>
    );
}

export default SupplyTable;
