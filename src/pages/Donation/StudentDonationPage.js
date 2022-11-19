import React, { useState, useEffect } from 'react';
import {
    Link,
    useOutletContext,
    useNavigate,
    useParams
} from 'react-router-dom';
import SupplyTableDonate from '../../components/TeacherDonation/SupplyTableDonate.js';
//import MetricsCards from '../components/TeacherDashboard/MetricsCards';
import { Header, Button, Container, Message, Divider } from 'semantic-ui-react';
//import DonationModal from '../../components/TeacherDonation/DonationModal';
import DonationService from '../../services/donations.service';
import _ from 'lodash';

function StudentDonationPage() {
    // Don't need use params because DonationLayout has it and will
    // always pull teacher's data to pass down as context
    const { teacher, supplies, setSupplies, recordRetrieved } =
        useOutletContext();
    const { studentId } = useParams();

    const [student, setStudent] = useState({});
    const [donations, setDonations] = useState([]);;
    const [studentRetrieved, setStudentRetrieved] = useState(false);

    //For development - Start the object as empty; once student's
    //prior donations are available, update it with those from
    // the start
    const [updates, setUpdates] = useState({});
    const navigate = useNavigate();

    // Note From Sean:
    // Use DonationService getStudentRecord to get student and their donations
    // 

    useEffect(() => {

        async function loadStudentInfo() {
            try {
                const response = await DonationService.getStudentRecord(
                    studentId
                );
                if (response.status === 200) {
                    if (!ignore) {
                        //console.log("Raw response data is: " + JSON.stringify(response.data))
                        const studentData = {
                            fname: response.data.firstName,
                            lname: response.data.lastName,
                        };
                        setStudent(studentData);
                        setDonations(response.data.donations);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        let ignore = false;
        loadStudentInfo();
        return () => {
            // cleanup code to ensure no race conditions
            ignore = true;
        };
        // call useEffect on re-render if there are any changes to student
    }, [studentId, studentRetrieved]);

    useEffect(() => {
        if (donations.length > 0 && supplies.length > 0) {
            setStudentRetrieved(true);
            console.log("Setting student retrieved to true");
        } else {
            setStudentRetrieved(false);
            console.log("Setting student retrieved to false")
        }
    }, [donations, supplies]);

    //Once donations is available, this will revise the supplies array
    // to include any donations already made by this student
    useEffect(() => {
        //make deep copy because array has mutable objects
        if (supplies.length > 0 && donations.length > 0) {
            let tempSupplies = _.cloneDeep(supplies);

            //add quantityDonatedByStudent field to all elements of supplies array
            for (let supply of tempSupplies) {
                supply.quantityDonatedByStudent = 1;
            }
            //if student has prior donations, update the variable in supply record
            for (let donation of donations) {
                let searchIndex = tempSupplies.findIndex((supply) => supply._id === donation.supply_id._id);
                console.log("Search index is: " + searchIndex);
                if (searchIndex >= 0) {
                    tempSupplies[searchIndex].quantityDonatedByStudent = donation.quantityDonated;
                }
            }
            setSupplies(tempSupplies);
        }

    }, [studentRetrieved]);

    /*
    useEffect(() => {
        console.log("Student retrieved: " + studentRetrieved);
    }, [studentRetrieved]);
    */
    //add any prior student donation data to the associated supplies record
    // so that it can be displayed in the table

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
                        Check that the id url is correct
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
