//import { updateSelectionOnFocus } from '@testing-library/user-event/dist/types/event/selection';
import React, { useState, useEffect } from 'react';
import { Table, Input } from 'semantic-ui-react';


function SupplyRowDonate({ supply, setUpdates, updates }) {

    let dif = supply.totalQuantityNeeded - supply.totalQuantityDonated;

    const [count, setCount] = useState(supply.quantityDonatedByStudent);
    const [max] = useState(dif >= 0 ? dif : 0);

    useEffect(() => {
        setCount(supply.quantityDonatedByStudent);
        
    }, []);

    useEffect(() => {
        setUpdates({ ...updates, [supply._id]: supply.quantityDonatedByStudent });
        setCount(supply.quantityDonatedByStudent);
    }, [supply])

    useEffect(() => {
        console.log("Current count value is: " + count);
    }, [count]);

    useEffect(() => {
        //console.log("Current updates object is: " + JSON.stringify(updates))
    }, [updates, setUpdates]);

    const onChange = (event) => {
        let curVal = parseInt(event.target.value);
        if (isNaN(curVal)) {
            curVal = null;
        }
        if (curVal > max) {
            curVal = max;
        }
        setCount(String(curVal));
        setUpdates({ ...updates, [event.target.name]: curVal != null ? String(curVal) : null });
    }
    return (
        <>
            <Table.Row>
                <Table.Cell>{supply.item}</Table.Cell>
                <Table.Cell>{supply.totalQuantityNeeded}</Table.Cell>
                <Table.Cell>{supply.totalQuantityDonated}</Table.Cell>
                <Table.Cell textAlign='left'>
                    <Input
                        type="number"
                        placeholder={supply.quantityDonatedByStudent}
                        min='0'
                        max={max}
                        value={count >= 0 ? count : ""}
                        name={supply._id}
                        onChange={onChange}
                    />
                </Table.Cell>
            </Table.Row>
        </>
    );
}
export default SupplyRowDonate;