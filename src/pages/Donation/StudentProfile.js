import React, { useState } from 'react';
import { Header, Form, Button, Segment, Popup } from 'semantic-ui-react';
import StudentService from '../../services/student.service.js';
import { useOutletContext } from 'react-router-dom';

function StudentProfile() {
    const { student } = useOutletContext();
    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [email, setEmail] = useState(student.email);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        const studentUpdate = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        try {
            const response = await StudentService.updateStudentRecord(
                student._id,
                studentUpdate
            );

            if (response.status === 200) {
                // Display success message for 1.5 seconds
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 1500);
                // update the Student in the Donation Layout Context
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='dashboardHeader'>
                <Header textAlign='left' as='h1' size='huge'>
                    <Header.Content>Edit Student Profile</Header.Content>
                </Header>
            </div>
            <Segment textAlign='left' raised color='orange'>
                <Header as='h3' size='large'>
                    <Header.Content>
                        {student.firstName} {student.lastName}
                        <Header.Subheader>
                            <strong>Donation Code:</strong>{' '}
                            {student.donationCode}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Form>
                    <Form.Group widths={3}>
                        <Form.Input
                            type='text'
                            label='First Name'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                        />
                        <Form.Input
                            type='text'
                            label='Last Name'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group widths={3}>
                        <Form.Input
                            type='email'
                            label='Email'
                            placeholder='Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Popup
                        position='top center'
                        inverted
                        size='large'
                        trigger={
                            <Button
                                primary
                                type='submit'
                                onClick={() => handleSubmit()}
                            >
                                Save Changes
                            </Button>
                        }
                        open={success}
                        content='Profile updated!'
                    />
                </Form>
            </Segment>
        </>
    );
}

export default StudentProfile;
