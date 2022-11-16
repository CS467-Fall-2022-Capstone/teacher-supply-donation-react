import React, { useState } from 'react';
import { Table, Button, Icon, Input } from 'semantic-ui-react';
import SupplyRow from './SupplyRow';

function SupplyTable({
    supplies,
    setSupplies,
    inEditMode,
    inAddMode,
    onDelete,
    onEdit,
    onSave,
    onCancel,
    onAdd,
    onSubmit,
}) {
    const [itemName, setItemName] = useState('');
    const [totalNeeded, setTotalQuantityNeeded] = useState(0);

    const handleSubmit = async (item, qty) => {
        try {
            const response = await onSubmit(item, qty);
            if (response.status === 201) {
                const newSupply = response.data;
                setSupplies([...supplies, newSupply]);
            }
        } catch (err) {
            console.log('Error response received from Donations API');
            console.log(err);
            throw err;
        } finally {
            // always executes after try {} or catch {}
            setItemName('');
            setTotalQuantityNeeded(0);
            onCancel(); // reset add mode
        }
    };

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
            <Table.Footer fullWidth>
                {inAddMode ? (
                    <Table.Row>
                        <Table.Cell>
                            <Input
                                placeholder='Enter Supply Item Name'
                                size='small'
                                value={itemName}
                                type='text'
                                onChange={(event) =>
                                    setItemName(event.target.value)
                                }
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                size='small'
                                value={totalNeeded}
                                type='number'
                                min='0'
                                onChange={(event) =>
                                    setTotalQuantityNeeded(event.target.value)
                                }
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                transparent
                                disabled
                                size='small'
                                placeholder='Default to 0'
                                type='number'
                            />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button
                                disabled={itemName.length === 0}
                                icon='check circle'
                                labelPosition='left'
                                size='small'
                                content='Add New Item'
                                primary
                                onClick={() =>
                                    handleSubmit(itemName, totalNeeded)
                                }
                            />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button
                                secondary
                                size='small'
                                icon='cancel'
                                labelPosition='left'
                                content='Cancel'
                                onClick={() => onCancel()}
                            />
                        </Table.Cell>
                    </Table.Row>
                ) : (
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                        <Table.HeaderCell textAlign='center' colSpan='2'>
                            <Button
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={() => onAdd()}
                            >
                                <Icon name='add' />
                                Add Item
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                )}
            </Table.Footer>
        </Table>
    );
}

export default SupplyTable;
