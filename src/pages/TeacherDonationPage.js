import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SupplyTableSimple from '../components/TeacherDonation/SupplyTableSimple.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';
import SupplyService from '../services/supply.service';

function TeacherDonationPage() {

    const [name, school, message, supplies] = useOutletContext();

    //fullSuppliesArr is populated by fetching the objects from 
    //the teacher's supplies array from the supplies endpoint in the backend
    const [fullSuppliesArr, setFullSuppliesArr] = useState([]);

    //fetch each object referenced in supplies array by id; load into fullSuppliesArr
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
                    let temp = []
                    for (let supply of supplies) {

                        let response = await SupplyService.getSupplyRecord(supply);
                        if (response.status === 200) {
                            temp.push(response.data)
                        }
                    }
                    setFullSuppliesArr(temp);
                }
            } catch (err) {
                console.log("Error response received from backend")
                console.log(err);
                throw err;
            }
        }

        loadSupplies();
    }, [supplies]);


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
                supplies={fullSuppliesArr}
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