//import { updateSelectionOnFocus } from '@testing-library/user-event/dist/types/event/selection';
import React, { useState, useEffect } from 'react';
import { Table, Input } from 'semantic-ui-react';


function SupplyRowDonate({ supply, setUpdates, updates }) {

    let dif = supply.totalQuantityNeeded - supply.totalQuantityDonated;

    //set count to the prior donations for this item (defaults to 0)
    const [count, setCount] = useState(supply.quantityDonatedByStudent);
    const [max] = useState(dif >= 0 ? dif : 0);
    //const min = 0

    useEffect(() => {
        console.log("Current count value is: " + count);
    }, [count]);

    useEffect(() => {
        console.log("Current updates object is: " + JSON.stringify(updates))
    }, [updates]);

    const onChange = (event) => {

        let curVal = event.target.value;
        //ensure that only values between 0 and max are accepted

        if (curVal === "") {
            curVal =null;
        }

        if (curVal > max) {
            curVal = max;
        }

        setCount(String(curVal));
        setUpdates({ ...updates, [event.target.name]: curVal });
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