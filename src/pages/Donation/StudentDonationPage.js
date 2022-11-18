import React, { useState } from 'react';
import {
    Link,
    useOutletContext,
    useNavigate,
} from 'react-router-dom';
import SupplyTableDonate from '../../components/TeacherDonation/SupplyTableDonate.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';
//import DonationModal from '../../components/TeacherDonation/DonationModal';
// import DonationService from '../../services/donations.service';

function StudentDonationPage() {
    // Don't need use params because DonationLayout has it and will
    // always pull teacher's data to pass down as context
    const {teacher, supplies, recordRetrieved} =
        useOutletContext();

// Note From Sean:
// Use DonationService getStudentRecord to get student and their donations
// 

    //For development - Start the object as empty; once student's
    //prior donations are available, update it with those from
    // the start
    const [updates, setUpdates] = useState({});

    const navigate = useNavigate();

    const onSubmit = /*async*/ (updatedSupplies) => {
        const newDonations = {
            updatedDonations: [],
        };
        for (const key of Object.keys(updatedSupplies)) {
            newDonations.updatedDonations.push({
                supply_id: key,
                quantityDonated: updatedSupplies[key],
            });
        }
        console.log('Object to submit: ' + JSON.stringify(newDonations));
        return 201;

        //return await DonationService.updateStudentDonations(student);
    };

    const handleSubmit = /*async*/ () => {
        try {
            const response = onSubmit(updates);
            if (response === 201) {
                console.log('Fake send successful');
            } else {
                console.log('Fake send unsuccessful');
            }
        } catch (err) {
            console.log('Error response received from Donations API');
            console.log(err);
            throw err;
        } finally {
            //For development - Return to teacher's public classroom page
            //eventually, on success go to the thank you page, or
            //handle unsuccessful attempt to donate
            navigate('/donations/teachers/' + teacher._id);
        }
    };

    return (
        <>
            {recordRetrieved ? (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            Donate Supplies to {teacher.name}'s Classroom!
                            <Header.Subheader>{teacher.school}</Header.Subheader>
                        </Header.Content>
                    </Header>

                    <Message size='big' color='olive' compact>
                        {teacher.message}
                    </Message>
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

                    <Message size='big' color='olive' compact>
                        Check that the id '{teacher._id}' is correct
                    </Message>
                </div>
            )}
            <Header size='large'> Supplies List</Header>
            <Divider fitted />

            <SupplyTableDonate
                supplies={supplies}
                setUpdates={setUpdates}
                updates={updates}
            />
            {recordRetrieved ? (
                <Container className='buttonRow' textAlign='center'>
                    <Button
                        type='submit'
                        size='medium'
                        content='Submit your donations'
                        onClick={() => handleSubmit(updates)}
                    />
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
