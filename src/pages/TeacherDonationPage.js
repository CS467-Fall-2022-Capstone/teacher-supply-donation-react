import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SupplyTableSimple from '../components/TeacherDonation/SupplyTableSimple.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';
//import AuthService from '../services/auth.service';

function TeacherDonationPage() {
    const [teacher, setTeacher] = useState('John Doe')
    const [school, setSchool] = useState('BinaryCode High School')
    const [message, setMessage] = useState('Thank you for your donation!')
    const [supplies, setSupplies] = useState([]);

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
                        Donate Supplies to {teacher}'s Classroom!
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