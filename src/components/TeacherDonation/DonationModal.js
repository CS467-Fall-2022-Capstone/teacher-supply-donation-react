import React, { useState } from 'react';
import {
    Button,
    Header,
    Icon,
    Modal,
    Divider,
    Input,
    Grid,
    Segment,
    Form,
} from 'semantic-ui-react';

function DonationModal() {
    const [open, setOpen] = useState(false);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [donationId, setDonationId] = useState('');

    const handleNewDonorSubmit = () => {};

    const handleReturningDonorSubmit = () => {};

    const handleSendEmailDonationId = () => {};

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
                                    onClick={() => handleNewDonorSubmit()}
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
                                    label='Donation ID'
                                    placeholder='Donation ID'
                                    onChange={(e) =>
                                        setDonationId(e.target.value)
                                    }
                                />
                                <Button
                                    size='small'
                                    disabled={donationId.length === 0}
                                    content='Update Donations'
                                    primary
                                    onClick={() => handleReturningDonorSubmit()}
                                />
                            </Form>
                            <Divider />
                            <Header textAlign='center' as='h3'>
                                Forgot your Donation ID?
                            </Header>
                            <Form>
                                <Form.Input
                                    size='mini'
                                    label='Email'
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button
                                    size='small'
                                    disabled={email.length === 0}
                                    content='Email Me My Donation ID'
                                    color='teal'
                                    onClick={() => handleSendEmailDonationId()}
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