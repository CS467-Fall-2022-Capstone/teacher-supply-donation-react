import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Header,
    Button,
    Container,
    Message,
    List,
    Segment,
} from 'semantic-ui-react';
import DonationService from '../../services/donations.service';


function ThankyouPage() {
    const { studentId } = useParams();
    const [student, setStudent] = useState({});
    const [donations, setDonations] = useState([]);
    const [recordRetrieved, setRecordRetrieved] = useState(false);

    useEffect(() => {
        async function loadStudentInfo() {
            try {
                const response = await DonationService.getStudentRecord(
                    studentId
                );
                if (response.status === 200) {
                    if (!ignore) {
                        const studentData = {
                            _id: response.data._id,
                            fname: response.data.firstName,
                            lname: response.data.lastName,
                            donationCode: response.data.donation_code,
                        };
                        setStudent(studentData);
                        setDonations(response.data.donations);
                        setRecordRetrieved(true);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        let ignore = false;
        loadStudentInfo();
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            {recordRetrieved ? (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        Thank you for your donation, {student.fname}!
                    </Header>
                    <Message color="olive" size="huge">
                        Your unique donation code is: {student.donationCode}
                    </Message>
                    <Container textAlign='center'>
                        <Segment inverted padded>
                            <List divided inverted relaxed size="big">
                                {donations.map((donation) => (
                                    <List.Item
                                        key={donation._id}
                                        donation={donation.donation_id}
                                    >
                                        <List.Header as='h2'>Item: <i>{donation.supply_id.item}</i></List.Header>
                                        Quantity Donated: {donation.quantityDonated}
                                    </List.Item>
                                ))}
                            </List>
                        </Segment>
                    </Container>
                    <Header size="large">
                        Please bring your donations to class with you!
                    </Header>
                    
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
