import React from 'react';
import { Table, List } from 'semantic-ui-react';

function ArchiveRow({ archivedSupply }) {
    return (
        <Table.Row>
            <Table.Cell>{archivedSupply.item}</Table.Cell>
            <Table.Cell>{archivedSupply.totalQuantityNeeded}</Table.Cell>
            <Table.Cell>
                <List items={archivedSupply.archivedDonations} />
            </Table.Cell>
        </Table.Row>
    );
}

export default ArchiveRow;
