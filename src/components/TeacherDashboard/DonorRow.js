import React from 'react';
import { Table } from 'semantic-ui-react';

function DonorRow({ student }) {

    return (
        <Table.Row>
            <Table.Cell>{student.firstName}</Table.Cell>
            <Table.Cell>{student.lastName}</Table.Cell>
            <Table.Cell>{student.student_id}</Table.Cell>
            <Table.Cell>{student.donations}</Table.Cell>
        </Table.Row>
    );
}

export default DonorRow;
