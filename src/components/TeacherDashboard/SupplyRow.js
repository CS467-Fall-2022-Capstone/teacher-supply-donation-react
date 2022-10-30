
import React from 'react';
import { Table } from 'semantic-ui-react';

function SupplyRow({ supply }) {
    const isNeeded = () => {
        if (supply.totalQtyNeeded === supply.qtyDonated) {
            return false;
        }
        return true;
    };

    return (
        <>
            {isNeeded ? (
                <Table.Row disabled>
                    <Table.Cell>{supply.item}</Table.Cell>
                    <Table.Cell>{supply.totalQtyNeeded}</Table.Cell>
                    <Table.Cell>{supply.qtyDonated}</Table.Cell>
                </Table.Row>
            ) : (
                <Table.Row>
                    <Table.Cell>{supply.item}</Table.Cell>
                    <Table.Cell>{supply.totalQtyNeeded}</Table.Cell>
                    <Table.Cell>{supply.qtyDonated}</Table.Cell>
                </Table.Row>
            )}
        </>
    );
}

export default SupplyRow;
