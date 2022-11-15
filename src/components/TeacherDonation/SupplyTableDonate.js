import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import SupplyRowDonate from './SupplyRowDonate';

function SupplyTableDonate({
    supplies, onInputChange
}) {
    const [itemName, setItemName] = useState('');
    const [totalNeeded, setTotalNeeded] = useState(0);

    return (
        <Table basic="very" celled selectable>
            <Table.Header >
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Needed</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Donated By the Class</Table.HeaderCell>
                    <Table.HeaderCell>Quantity You're Donating</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {supplies.map((supply, i) => (
                    <SupplyRowDonate
                        key={i}
                        supply={supply}
                        onInputChange={onInputChange}
                    />
                ))}
            </Table.Body>
        </Table>
    );
}

export default SupplyTableDonate;