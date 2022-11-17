//import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SupplyTableSimple from '../../components/TeacherDonation/SupplyTableSimple.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';
import DonationModal from '../../components/TeacherDonation/DonationModal';
function TeacherDonationPage() {
    const [name, school, message, supplies, teacher_id, recordRetrieved] =
        useOutletContext();

    return (
        <>
            <div className='dashboardHeader'>
                {recordRetrieved ? (
                    <>
                        <Header size='huge' textAlign='center'>
                            <Header.Content>
                                Donate Supplies to {name}'s Classroom!
                                <Header.Subheader>{school}</Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Message size='big' color='olive' compact>
                            {message}
                        </Message>
                    </>
                ) : (
                    <>
                        <Header size='huge' textAlign='center'>
                            <Header.Content>
                                Problem accessing this Classroom Page
                                <Header.Subheader>
                                    Record not accessed
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Message size='big' color='olive' compact>
                            Check that the id '{teacher_id}' is correct
                        </Message>
                    </>
                )}
            </div>

            <Header size='large'> Supplies List</Header>
            <Divider fitted />
            <SupplyTableSimple supplies={supplies} />
            {recordRetrieved ? (
                <>
                    <Container className='buttonRow' textAlign='center'>
                        <DonationModal />
                    </Container>
                </>
            ) : (
                <>
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
            )}
        </>
    );
}

export default TeacherDonationPage;
