import React, { useState } from 'react';
import { Header, Form, Button, Segment, Popup } from 'semantic-ui-react';
import { useOutletContext } from 'react-router-dom';
import TeacherService from '../../services/teacher.service.js';

function Settings() {
    const { teacher, setTeacher } = useOutletContext();
    const [name, setName] = useState(teacher.name);
    const [schoolName, setSchoolName] = useState(teacher.school || '');
    const [email, setEmail] = useState(teacher.email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(teacher.message || '');
    const [successMessage, setSuccessMessage] = useState(false);

    const handleSubmit = async () => {
        // Update Teacher model
        let teacherUpdate = {
            name: name,
            school: schoolName,
            email: email,
            message: message,
        };
        try {
            let response;
            if (newPassword === '' && confirmPassword === '') {
                response = await TeacherService.updateTeacherRecord(
                    teacher,
                    teacherUpdate
                );
            } else if (newPassword === confirmPassword) {
                teacherUpdate.password = newPassword;
                response = await TeacherService.updateTeacherRecord(
                    teacher,
                    teacherUpdate
                );
            } else {
                alert('Password does not match!');
            }

            if (response.status === 200) {
                // Display success message for 1.5 seconds
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 1500);
                // update the Teacher in AuthProvider with the latest profile update
                setTeacher(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge'>
                    <Header.Content>Settings</Header.Content>
                </Header>
            </div>
            <Segment textAlign='left' raised color='orange'>
                <Form>
                    <Form.Group widths={3}>
                        <Form.Input
                            type='text'
                            label='Full Name'
                            placeholder='Full Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group widths={3}>
                        <Form.Input
                            type='text'
                            label='School'
                            placeholder='Enter your school name'
                            value={schoolName}
                            onChange={(event) =>
                                setSchoolName(event.target.value)
                            }
                        />
                        <Form.Input
                            type='email'
                            label='Email'
                            placeholder='Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.TextArea
                        width={6}
                        label='Donation Page Message'
                        placeholder='Write a message to display on the donation page'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Form.Group widths={3}>
                        <Form.Input
                            type='password'
                            label='Change Password'
                            placeholder='Change Password'
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(event.target.value)
                            }
                        />
                        <Form.Input
                            type='password'
                            label='Confirm Password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                        />
                    </Form.Group>
                    <Popup
                        position='top center'
                        inverted
                        open={successMessage}
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
                        content='Profile saved!'
                    />
                </Form>
            </Segment>
        </>
    );
}

export default Settings;
