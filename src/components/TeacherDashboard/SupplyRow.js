import React, { useState } from 'react';
import { Table, Input, Button } from 'semantic-ui-react';
import { FaEdit } from 'react-icons/fa';
import DeleteModal from './DeleteModal';

function SupplyRow({ supply, inEditMode, onDelete, onEdit, onSave, onCancel }) {
    const [supplyName, setSupplyName] = useState(supply.item);
    const [totalQuantityNeeded, setTotalQuantityNeeded] = useState(
        supply.totalQuantityNeeded
    );

    const handleCancelEdit = () => {
        setSupplyName(supply.item);
        setTotalQuantityNeeded(supply.totalQuantityNeeded)
        onCancel()
    }
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
                            error={
                                totalQuantityNeeded <
                                supply.totalQuantityDonated
                            }
                            size='small'
                            value={totalQuantityNeeded}
                            type='number'
                            min={supply.totalQuantityDonated}
                            onChange={(event) =>
                                setTotalQuantityNeeded(event.target.value)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>{supply.totalQuantityDonated}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button
                            disabled={
                                totalQuantityNeeded <
                                supply.totalQuantityDonated
                            }
                            content='Save'
                            primary
                            onClick={(e) =>
                                e.target.value < supply.totalQuantityDonated
                                    ? setTotalQuantityNeeded(
                                          supply.totalQuantityNeeded
                                      )
                                    : onSave(supply, {
                                          supplyName,
                                          totalQuantityNeeded,
                                      })
                            }
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button content='Cancel' onClick={() => handleCancelEdit()} />
                    </Table.Cell>
                </Table.Row>
            ) : (
                <Table.Row>
                    <Table.Cell>{supply.item}</Table.Cell>
                    <Table.Cell>{supply.totalQuantityNeeded}</Table.Cell>
                    <Table.Cell>{supply.totalQuantityDonated}</Table.Cell>
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
