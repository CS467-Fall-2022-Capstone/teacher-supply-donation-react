import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SupplyTableDonate from '../../components/TeacherDonation/SupplyTableDonate.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';
//import DonationModal from '../../components/TeacherDonation/DonationModal';


function StudentDonationPage() {
    const [name, school, message, supplies, teacher_id, recordRetrieved] =
        useOutletContext();
    /*
    const [inEditMode, setInEditMode] = useState({

    })

    */
   //For development - Start the object; once student's
   //prior donations are available, update it with those from 
   // the start
    const [updates, setUpdates] = useState({});

    const onInputChange = (supply_id, count) => {
        const temp = updates;
        temp[supply_id] = count;
        setUpdates(temp);
        console.log("Updates object is: ", JSON.stringify(updates));
    }
    /*
        const [donationsArr, setDonationsArr] = useState([]);
        const [newDonation, setNewDonation] = useState({
            student_id: '',
            quantityDonated: '',
        })

*/
/*
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
        */
    /*
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

            <SupplyTableDonate supplies={supplies} onInputChange={onInputChange} />
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

        </>
    );
}

export default StudentDonationPage;
