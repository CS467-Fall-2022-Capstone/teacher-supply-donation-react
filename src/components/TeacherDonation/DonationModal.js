import React, { useState } from 'react';
import {
    Button,
    Header,
    Icon,
    Modal,
    Divider,
    Grid,
    Segment,
    Form,
    Popup,
} from 'semantic-ui-react';
import DonationService from '../../services/donations.service';
import { useOutletContext } from 'react-router-dom';

function DonationModal({ handleNewDonorSubmit, handleReturningDonorSubmit }) {
    const [open, setOpen] = useState(false);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [donationCode, setDonationCode] = useState('');
    const { teacher } = useOutletContext();
    const [successMessage, setSuccessMessage] = useState(false);

    const handleSendEmailDonationCode = async () => {
        try {
            let response = await DonationService.sendEmailDonationCode(
                email,
                teacher.name
            );
            if (response.status === 200) {
                // Display success message for 3 seconds
                console.log('response received');
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onDonationCodeSubmit = async () => {
        try {
            const response = await DonationService.getStudentByDonationCode(
                donationCode
            );
            if (response.status === 200) {
                const student_id = response.data.student_id;
                handleReturningDonorSubmit(student_id);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setOpen(false);
        }
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='fullscreen'
            trigger={
                <Button primary size='big'>
                    <Icon name='add' />
                    Add or Update Donation
                </Button>
            }
        >
            <Modal.Header>Create New or Update Existing Donation</Modal.Header>
            <Modal.Content>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stretched>
                        <Grid.Column>
                            <Header as='h3'>Create First Time Donation</Header>
                            {/* Do NOT use onSubmit because there are multiple forms on the component */}
                            <Form>
                                <Form.Input
                                    size='mini'
                                    label='First Name'
                                    placeholder='First Name'
                                    onChange={(e) => setFName(e.target.value)}
                                />
                                <Form.Input
                                    size='mini'
                                    label='Last Name'
                                    placeholder='Last Name'
                                    onChange={(e) => setLName(e.target.value)}
                                />
                                <Form.Input
                                    size='mini'
                                    label='Email'
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Button
                                    size='small'
                                    disabled={
                                        fName.length === 0 ||
                                        lName.length === 0 ||
                                        email.length === 0
                                    }
                                    content='Start New Donation'
                                    primary
                                    onClick={() =>
                                        handleNewDonorSubmit(
                                            fName,
                                            lName,
                                            email
                                        )
                                    }
                                />
                            </Form>
                        </Grid.Column>

                        <Grid.Column>
                            <Header as='h3'>
                                Returning Donors - Update Donations
                            </Header>
                            <Form>
                                <Form.Input
                                    size='mini'
                                    label='Donation Code'
                                    placeholder='Donation Code'
                                    onChange={(e) =>
                                        setDonationCode(e.target.value)
                                    }
                                />
                                <Button
                                    size='small'
                                    disabled={donationCode.length === 0}
                                    content='Update Donations'
                                    primary
                                    onClick={() => onDonationCodeSubmit()}
                                />
                            </Form>
                            <Divider />
                            <Header as='h3'>Forgot your Donation Code?</Header>
                            <Form>
                                <Form.Input
                                    size='mini'
                                    label='Email'
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Popup
                                    position='top center'
                                    inverted
                                    open={successMessage}
                                    size='large'
                                    trigger={
                                        <Button
                                            size='small'
                                            disabled={email.length === 0}
                                            content='Email Me My Donation Code'
                                            color='teal'
                                            onClick={() =>
                                                handleSendEmailDonationCode()
                                            }
                                        />
                                    }
                                    content='Email sent!'
                                />
                            </Form>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Or</Divider>
                </Segment>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => setOpen(false)}>
                    <Icon name='close' /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default DonationModal;
