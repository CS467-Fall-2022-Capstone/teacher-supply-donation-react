import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import SupplyTableSimple from '../components/TeacherDonation/SupplyTableSimple.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';
import { } from "react-router-dom";
//import AuthService from '../services/auth.service';

function TeacherDonationPage() {

    const [name, setName, email, setEmail, school, setSchool, message, setMessage, supplies, setSupplies] = useOutletContext();

    
    const loadSupplies = async () => {
        // TODO: implement data fetch in AuthService

        // For Testing, delete once back-end is integrated
        const testData = [
            {
                _id: 1,
                item: 'Pencils',
                totalQtyNeeded: 10,
                qtyDonated: 5,
            },
            {
                _id: 2,
                item: 'Tissue Boxes',
                totalQtyNeeded: 5,
                qtyDonated: 1,
            },
            {
                _id: 3,
                item: 'Scissors',
                totalQtyNeeded: 15,
                qtyDonated: 0,
            },
        ];
        setSupplies(testData);
    };

    useEffect(() => {
        loadSupplies();
    }, []);

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