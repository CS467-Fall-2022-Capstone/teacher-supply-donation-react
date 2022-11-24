import React, {useState} from 'react';
import { Table, List, Input, Button } from 'semantic-ui-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import StudentService from '../../services/student.service.js';
import { useNavigate } from 'react-router-dom'

function DonorRow({ student, inEditMode, onEdit, onSave, onCancel }) {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [email, setEmail] = useState(student.email);

    const handleCancelEdit = () => {
        setFirstName(student.firstName);
        setLastName(student.lastName);
        setEmail(student.email);
        onCancel();
    };
    const formattedDonations = student.donations.map((donation, i) => {
        let supply = donation.supply_id.item;
        let quantityDonated = donation.quantityDonated;
        return `${supply} - ${quantityDonated}`;
    });

    const onDelete = (student_id) => {
        StudentService.deleteStudentRecord(student_id);
        navigate('/teachers/dashboard/donors')
    };
    console.log(student);
    return (
        <>
            {inEditMode.status && inEditMode.studentKey === student._id ? (
                <Table.Row>
                    <Table.Cell>
                        <Input
                            size='small'
                            value={firstName}
                            type='text'
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>
                    <Input
                            size='small'
                            value={lastName}
                            type='text'
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>
                    <Input
                            size='small'
                            value={email}
                            type='text'
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />
                    </Table.Cell>
                    <Table.Cell>{student.donation_code}</Table.Cell>
                    <Table.Cell>
                        <List items={formattedDonations} />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button
                            content='Save'
                            primary
                            onClick={(e) =>
                                onSave(student, {
                                            firstName,
                                            lastName,
                                            email
                                        })
                            }
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button
                            content='Cancel'
                            onClick={() => handleCancelEdit()}
                        />
                    </Table.Cell>
                </Table.Row>
            ) : (
                <Table.Row>
                    <Table.Cell>{student.firstName}</Table.Cell>
                    <Table.Cell>{student.lastName}</Table.Cell>
                    <Table.Cell>{student.email}</Table.Cell>
                    <Table.Cell>{student.donation_code}</Table.Cell>
                    <Table.Cell>
                        <List items={formattedDonations} />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <FaEdit
                            as='button'
                            onClick={() => onEdit(student._id)}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <FaTrash style={{color: 'red'}}
                            as='button'
                            onClick={() => onDelete(student._id)}
                        />
                    </Table.Cell>
                </Table.Row>
            )}
        </>
    );
}

export default DonorRow;
