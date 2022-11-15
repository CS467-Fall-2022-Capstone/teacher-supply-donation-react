import React, { useState } from 'react';
import { Table, Input, Form } from 'semantic-ui-react';

function SupplyRowDonate({ supply, onInputChange }) {

    let dif = supply.totalQuantityNeeded - supply.quantityDonated

    //set count to the prior donations for this item (defaults to 0)
    const [count, setCount] = useState(0);
    const [max] = useState(dif >= 0 ? dif : 0);
    const [donations] = useState(String(count));

    const onCountChange = (supply_id, newValue) => {
        const newCount = newValue;
        setCount(newCount);
        console.log ("Count is:" + count);
        onInputChange(supply_id, count);
    }

    const handleChange = (event) => {
        const newCount = event.target.value;
        const name = event.target.name;
        onCountChange(supply.supply_id, newCount)
        console.log("Input value is: " + count);
    }

    //const [supplyName, setSupplyName] = useState(supply.item);
    //const [qtyNeeded, setQtyNeeded] = useState(supply.totalQtyNeeded);
    const [supply_id, setSupplyId] = useState(supply.supply_id);
    const [quantityDonated, setQuantityDonated] = useState(String(count));


    return (
        <>
            <Table.Row>
                <Table.Cell>{supply.item}</Table.Cell>
                <Table.Cell>{supply.totalQuantityNeeded}</Table.Cell>
                <Table.Cell>{supply.quantityDonated}</Table.Cell>
                <Table.Cell textAlign='left'>
                    <Input
                        type="number"
                        placeholder={donations}
                        min='0'
                        max={max}
                        value={count}
                        name="quantityDonated"
                        onChange={handleChange}
                    />
                </Table.Cell>
            </Table.Row>
        </>
    );
}
export default SupplyRowDonate;