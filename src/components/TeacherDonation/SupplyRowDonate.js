import React, { useState } from 'react';
import { Table, Input, Form } from 'semantic-ui-react';

function SupplyRowDonate({ supply }) {

    let dif = supply.totalQuantityNeeded - supply.quantityDonated

    //set count to the prior donations for this item (defaults to 0)
    const [count, setCount] = useState(0);
    const [max] = useState(dif >= 0 ? dif : 0);
    const [donations] = useState(String(count));

    /*
    const handleCountChange = (newValue) => {
        setCount(newValue)
    }
    */

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
                    <Form.Input
                        type="number"
                        placeholder={donations}
                        min='0'
                        max={max}
                        value={count}
                        onChange={(event) => {
                            setCount(event.target.value);
                            console.log("Input value is: " + count);
                            }
                        }
                    />
                </Table.Cell>
            </Table.Row>
        </>
    );
}
export default SupplyRowDonate;