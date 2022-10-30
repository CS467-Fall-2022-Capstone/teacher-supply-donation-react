import React, { useState } from 'react';
import { Table, Input, Button } from 'semantic-ui-react';
import { FaEdit } from 'react-icons/fa';
import DeleteModal from './DeleteModal';

function SupplyRow({ supply, inEditMode, onDelete, onEdit, onSave, onCancel }) {
    const [supplyName, setSupplyName] = useState(supply.item);
    const [qtyNeeded, setQtyNeeded] = useState(supply.totalQtyNeeded);
    return (
        <>
            {inEditMode.status && inEditMode.supplyKey === supply._id ? (
                <Table.Row>
                    <Table.Cell>
                        <Input
                            size='small'
                            value={supplyName}
                            type='text'
                            onChange={(event) =>
                                setSupplyName(event.target.value)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Input
                            size='small'
                            value={qtyNeeded}
                            type='number'
                            min='0'
                            onChange={(event) =>
                                setQtyNeeded(event.target.value)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>{supply.qtyDonated}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button
                            content='Save'
                            primary
                            onClick={() =>
                                onSave(supply._id, supplyName, qtyNeeded)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button content='Cancel' onClick={() => onCancel()} />
                    </Table.Cell>
                </Table.Row>
            ) : (
                <Table.Row>
                    <Table.Cell>{supply.item}</Table.Cell>
                    <Table.Cell>{supply.totalQtyNeeded}</Table.Cell>
                    <Table.Cell>{supply.qtyDonated}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <FaEdit as='button' onClick={() => onEdit(supply)} />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <DeleteModal onDelete={onDelete} supply={supply} />
                    </Table.Cell>
                </Table.Row>
            )}
        </>
    );
}

export default SupplyRow;
