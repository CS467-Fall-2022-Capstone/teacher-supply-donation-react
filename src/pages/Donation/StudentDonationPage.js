import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SupplyTableDonate from '../../components/TeacherDonation/SupplyTableDonate.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider, Form } from 'semantic-ui-react';
//import DonationModal from '../../components/TeacherDonation/DonationModal';


function StudentDonationPage() {
    const [name, school, message, supplies, teacher_id, recordRetrieved] =
        useOutletContext();
    /*
        const [donationsArr, setDonationsArr] = useState([]);
        const [newDonation, setNewDonation] = useState({
            student_id: '',
            quantityDonated: '',
        })

        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

        const handleInputChange = (event) => {
            const { name, value } = event.target;
    
            setFormData((currentFormData) => {
                const nextFormData = {
                    ...currentFormData,
                    [name]: value,
                };
                console.log(nextFormData);
                return nextFormData;
            });
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            setDonationsArr([...donationsArr, newDonation])

        }
        */

    return (
        <>
            {recordRetrieved ? (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            Donate Supplies to {name}'s Classroom!
                            <Header.Subheader>{school}</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Container textAlign='center'>
                        <Message size='big' color='olive' compact>
                            {message}
                        </Message>
                    </Container>
                </div>
            ) : (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            Problem accessing this Classroom Page
                            <Header.Subheader>
                                Record not accessed
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Container textAlign='center'>
                        <Message size='big' color='olive' compact>
                            Check that the id '{teacher_id}' is correct
                        </Message>
                    </Container>
                </div>
            )}
            <Header size='large'> Supplies List</Header>
            <Divider fitted />
            <Form>
                <SupplyTableDonate supplies={supplies} />
                {recordRetrieved ? (
                    <Container className='buttonRow' textAlign='center'>
                        <Button>
                            Submit your donations
                        </Button>
                    </Container>

                ) : (
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
                )}
            </Form>
        </>
    );
}

export default StudentDonationPage;
