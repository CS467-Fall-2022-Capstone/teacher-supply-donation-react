import React, { useState } from 'react';
import { Header, Form, Button } from 'semantic-ui-react';

function Settings() {
    const [name, setName] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        // TODO: Update Teacher model
        let teacherUpdate = {
            name: name,
            schoolName: schoolName,
            email: email,
        };
        if (newPassword === '' && confirmPassword === '') {
            // Send teacher update without password changes
            console.log(teacherUpdate);
        } else {
            if (newPassword !== confirmPassword) {
                alert('Password does not match!');
            } else {
                teacherUpdate.password = newPassword;
                console.log(teacherUpdate);
            }
        }
    };

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge'>
                    <Header.Content>Settings</Header.Content>
                </Header>
            </div>
            <Form size='large'>
                <Form.Input
                    type='text'
                    label='Full Name'
                    placeholder='Full Name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    width={2}
                />
                <Form.Group widths={3}>
                    <Form.Input
                        type='text'
                        label='School'
                        placeholder='School'
                        value={schoolName}
                        onChange={(event) => setSchoolName(event.target.value)}
                    />
                    <Form.Input
                        type='email'
                        label='Email'
                        placeholder='Email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group widths={3}>
                    <Form.Input
                        type='password'
                        label='Change Password'
                        placeholder='Change Password'
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
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
                <Button primary type='submit' onClick={() => handleSubmit()}>
                    Save Changes
                </Button>
            </Form>
        </>
    );
}

export default Settings;
