//import { updateSelectionOnFocus } from '@testing-library/user-event/dist/types/event/selection';
import React, { useState } from 'react';
import { Table, Input, Popup } from 'semantic-ui-react';

function SupplyRowDonate({ id, supply, handleDonationChange }) {
    const [quantityDonated, setQuantityDonated] = useState(
        supply.donationFields.quantityDonated
    );

    const handleChange = (e) => {
        setQuantityDonated(e.target.value);
        return {
            ...supply,
            donationFields: {
                ...supply.donationFields,
                [e.target.name]: Number(e.target.value),
            },
        };
    };

    return (
        <>
            <Table.Row>
                <Table.Cell>{supply.supplyName}</Table.Cell>
                <Table.Cell>{supply.totalQuantityNeeded}</Table.Cell>
                <Table.Cell>{supply.totalQuantityDonated}</Table.Cell>
                <Table.Cell textAlign='left'>
                    {quantityDonated > supply.maxAllowed ? (
                        <Popup
                            inverted
                            trigger={
                                <Input
                                    type='number'
                                    min='0'
                                    id={id}
                                    max={supply.maxAllowed}
                                    value={quantityDonated}
                                    name='quantityDonated'
                                    onChange={(e) =>
                                        handleDonationChange(e, handleChange)
                                    }
                                />
                            }
                            content={`You cannot donate more than ${supply.maxAllowed}`}
                            on={['hover', 'focus']}
                        />
                    ) : (
                        <Input
                            type='number'
                            min='0'
                            id={id}
                            max={supply.maxAllowed}
                            value={quantityDonated}
                            name='quantityDonated'
                            onChange={(e) =>
                                handleDonationChange(e, handleChange)
                            }
                        />
                    )}
                </Table.Cell>
            </Table.Row>
        </>
    );
}
export default SupplyRowDonate;
