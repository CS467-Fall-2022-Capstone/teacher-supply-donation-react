import React, { useState } from 'react';
import { Table, Input, Button } from 'semantic-ui-react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function SupplyRow({
    supply,
    inEditMode,
    onDelete,
    onEdit,
    onSave,
    onCancel
}) {
    const [supplyName, setSupplyName] = useState(supply.item);
    const [qtyNeeded, setQtyNeeded] = useState(supply.totalQtyNeeded);
    return (
        <>
            {inEditMode.status && inEditMode.supplyKey === supply._id ? (
                <Table.Row>
                    <Table.Cell>
                        <Input
                            value={supplyName}
                            type='text'
                            onChange={(event) =>
                                setSupplyName(event.target.value)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Input
                            value={qtyNeeded}
                            type='number'
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
                            onClick={() => onSave(supply._id, supplyName, qtyNeeded)}
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
                        <FaTrashAlt
                            as='button'
                            color='red'
                            onClick={() => onDelete(supply._id)}
                        />
                    </Table.Cell>
                </Table.Row>
            )}
        </>
    );
}

export default SupplyRow;
