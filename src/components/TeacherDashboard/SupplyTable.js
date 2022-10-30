import React from 'react';
import { Table } from 'semantic-ui-react';
import SupplyRow from './SupplyRow';

function SupplyTable({
    supplies,
    inEditMode,
    inAddMode,
    onDelete,
    onEdit,
    onSave,
    onCancel,
}) {
    return (
        <Table inverted celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Needed</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Donated</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' colSpan='2'>
                        Actions
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {supplies.map((supply, i) => (
                    <SupplyRow
                        key={i}
                        supply={supply}
                        inEditMode={inEditMode}
                        inAddMode={inAddMode}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onSave={onSave}
                        onCancel={onCancel}
                    />
                ))}
            </Table.Body>
        </Table>
    );
}

export default SupplyTable;
