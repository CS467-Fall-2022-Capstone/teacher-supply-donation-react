import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';

function SupplyRowSimple({ supply }) {
    const [supplyName, setSupplyName] = useState(supply.item);
    const [qtyNeeded, setQtyNeeded] = useState(supply.totalQtyNeeded);
    return (
        <>
            <Table.Row>
                <Table.Cell>{supply.item}</Table.Cell>
                <Table.Cell>{supply.totalQtyNeeded}</Table.Cell>
                <Table.Cell>{supply.qtyDonated}</Table.Cell>
            </Table.Row>
        </>
    );
}
export default SupplyRowSimple;