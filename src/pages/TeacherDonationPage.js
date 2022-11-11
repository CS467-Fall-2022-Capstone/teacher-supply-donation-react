import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SupplyTableSimple from '../components/TeacherDonation/SupplyTableSimple.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';

function TeacherDonationPage() {

    const [name, school, message, supplies, teacher_id] = useOutletContext();

    //fullSuppliesArr is populated by fetching the objects from 
    //the teacher's supplies array from the supplies endpoint in the backend
    //const [fullSuppliesArr, setFullSuppliesArr] = useState([]);

    //fetch each object referenced in supplies array by id; load into fullSuppliesArr
    /*
    useEffect(() => {

        const loadSupplies = async () => {
            try {
                if (supplies.length === 0) {

                    setFullSuppliesArr([{
                        _id: 1,
                        item: 'No items registered',
                        totalQuantityNeeded: 'NA',
                        quantityDonated: 'NA'
                    }])
                } else {
                    console.log("Teacher Donation Component reading teacher id as: ", teacher_id);
                    let response = await SupplyService.getSupplyRecord(teacher_id);
                    if (response.status === 200) {
                        setFullSuppliesArr(response.data.supplies);
                    }
                }
            } catch (err) {
                console.log("Error response received from Donations API")
                console.log(err);
                throw err;
            }
        }

        loadSupplies();
    }, [supplies, teacher_id]);
    */

    return (
        <>
            <div className='dashboardHeader'>
                <Header size='huge' textAlign='center'>
                    <Header.Content>
                        Donate Supplies to {name}'s Classroom!
                        <Header.Subheader>{school}</Header.Subheader>
                    </Header.Content>
                </Header>
                <Container textAlign='center'>
                    <Message size="big" color='olive' compact>{message}</Message>
                </Container>
            </div>
            <Header size="large"> Supplies List</Header>
            <Divider fitted />
            <SupplyTableSimple
                supplies={supplies}
            />
            <Container className='buttonRow' textAlign='center'>
                <Button
                    type="submit"
                    as={Link}
                    to='/'
                    color='blue'

                    size='huge'
                    style={{ marginBottom: '1em' }}

                >Add or Update Donation</Button>
            </Container>
        </>
    );
}

export default TeacherDonationPage;