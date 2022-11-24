import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
    Header,
    Button,
    Container,
    Divider,
    Message,
    List,
} from 'semantic-ui-react';

function ThankyouPage() {
    const [student, donations, recordRetrieved] = useOutletContext();

    return (
        <>
            {recordRetrieved ? (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            Thank you for your donation, {student.fname}! Your
                            unique donation code is: {student.donationCode}
                        </Header.Content>
                        <Divider />
                    </Header>

                    <Container textAlign='Center'>
                        <Header as='h3'>
                            Please bring your donations to class with you:
                        </Header>
                        <List bulleted>
                            {donations.map((donation) => (
                                <List.Item
                                    as={Header}
                                    key={donation._id}
                                    donation={donation.donation_id}
                                    content={`Item: ${donation.supply_id.item} | Quantity Donated: ${donation.quantityDonated}`}
                                />
                            ))}
                        </List>
                    </Container>
                    <Divider />
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
                            Check that the student id '{student._id}' is correct
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
