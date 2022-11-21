import React from 'react';
import { Table } from 'semantic-ui-react';
import SupplyRowDonate from './SupplyRowDonate';

function SupplyTableDonate({ suppliesAndDonations, handleDonationChange }) {
    return (
        <Table basic='very' celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantity Needed</Table.HeaderCell>
                    <Table.HeaderCell>
                        Quantity Donated By the Class
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Quantity You're Donating
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {suppliesAndDonations.map((supply) => (
                    <SupplyRowDonate
                        key={supply.supply_id}
                        id={supply.supply_id}
                        supply={supply}
                        handleDonationChange={handleDonationChange}
                    />
                ))}
            </Table.Body>
        </Table>
    );
}

export default SupplyTableDonate;
