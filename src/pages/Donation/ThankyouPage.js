import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Header, Button, Container, Divider, Message, List } from 'semantic-ui-react';

function ThankyouPage() {
    const [student_id, donations, recordRetrieved] =
        useOutletContext();

    return (
        <>
            {recordRetrieved ? (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            Thank you for your donation!
                        </Header.Content>
                    </Header>
                    <Divider />
                    <Container textAlign='left'>
                        <Header as="h3">Please bring your donations to class with you:</Header>
                        <List bulleted>
                            {donations.map((donation) => (
                                <List.Item
                                    key={donation.donation_id}
                                    donation={donation.donation_id}
                                    content={<Header as="h3">Donation ID: {donation.donation_id}, Quantity Donated: {donation.quantityDonated}</Header>}
                                />
                            ))}
                        </List>
                    </Container>
                    <Divider />
                    <Container textAlign='left'>
                        <Header as="h3">Your unique donation ID is: {student_id}. If you need to update or delete your donation form...</Header>
                    </Container>
                </div>
            ) : (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            Problem accessing record
                            <Header.Subheader>
                                Record not accessed
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Container textAlign='center'>
                        <Message size='big' color='olive' compact>
                            Check that the student id '{student_id}' is correct
                        </Message>
                    </Container>
                </div>
            )}

            <Container className='buttonRow' textAlign='center'>
                <Button
                    type='submit'
                    as={Link}
                    to='/'
                    color='blue'
                    size='huge'
                    style={{ marginBottom: '1em' }}
                >
                    Return Home
                </Button>
            </Container>
        </>
    );
}

export default ThankyouPage;