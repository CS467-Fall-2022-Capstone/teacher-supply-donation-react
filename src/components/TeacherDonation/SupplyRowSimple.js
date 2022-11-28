import React from 'react';
import { Table } from 'semantic-ui-react';

function SupplyRowSimple({ supply }) {
    return (
        <>
            <Table.Row>
                <Table.Cell>{supply.item}</Table.Cell>
                <Table.Cell>{supply.totalQuantityNeeded}</Table.Cell>
                <Table.Cell>{supply.totalQuantityDonated}</Table.Cell>
            </Table.Row>
        </>
    );
}
export default SupplyRowSimple;
