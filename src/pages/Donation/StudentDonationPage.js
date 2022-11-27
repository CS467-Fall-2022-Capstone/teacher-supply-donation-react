import React, { useState, useEffect } from 'react';
import {
    Link,
    useOutletContext,
    useNavigate,
    useParams,
} from 'react-router-dom';
import SupplyTableDonate from '../../components/TeacherDonation/SupplyTableDonate.js';
import {
    Header,
    Button,
    Container,
    Message,
    Divider,
    Segment,
} from 'semantic-ui-react';
import DonationService from '../../services/donations.service';

function StudentDonationPage() {
    // Don't need use params because DonationLayout has it and will
    // always pull teacher's data to pass down as context
    const { teacher, supplies, student, setStudent } = useOutletContext();
    const { studentId } = useParams();
    const [suppliesAndDonations, setSuppliesAndDonations] = useState([]);
    const [studentRetrieved, setStudentRetrieved] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const initializeDonations = (studentId, supplies, donations) => {
        if (donations.length === 0) {
            // First time donating, all insert operations
            const insertOneObjects = supplies.map((supply) => {
                const supplyItem = {
                    supply_id: supply._id,
                    supplyName: supply.item,
                    totalQuantityNeeded: supply.totalQuantityNeeded,
                    totalQuantityDonated: supply.totalQuantityDonated,
                    maxAllowed:
                        supply.totalQuantityNeeded -
                        supply.totalQuantityDonated,
                    update: false,
                    donationFields: {
                        student_id: studentId,
                        supply_id: supply._id,
                        supplyItem: supply.item,
                        quantityDonated: 0,
                    },
                };
                return supplyItem;
            });
            // bulk form data to be all insert operations
            setStudentRetrieved(true);
            return insertOneObjects;
        } else {
            // if there are donations then map the supply to the donation
            const insertOrUpdateObjects = supplies.map((supply) => {
                // Find a matching donation
                let donatedItem = donations.find(
                    (donation) => donation.supply_id._id === supply._id
                );
                if (donatedItem) {
                    // donation exists
                    return {
                        supply_id: supply._id,
                        supplyName: supply.item,
                        totalQuantityNeeded: supply.totalQuantityNeeded,
                        totalQuantityDonated: supply.totalQuantityDonated,
                        maxAllowed:
                            supply.totalQuantityNeeded +
                            donatedItem.quantityDonated -
                            supply.totalQuantityDonated,
                        update: true,
                        donationFields: {
                            // Only thing we can update is the quantity to donate
                            donation_id: donatedItem._id,
                            quantityDonated: donatedItem.quantityDonated,
                        },
                    };
                } else {
                    // no matching donation so it would be an insertOne
                    return {
                        supply_id: supply._id,
                        supplyName: supply.item,
                        totalQuantityNeeded: supply.totalQuantityNeeded,
                        totalQuantityDonated: supply.totalQuantityDonated,
                        maxAllowed:
                            supply.totalQuantityNeeded -
                            supply.totalQuantityDonated,
                        update: false,
                        donationFields: {
                            student_id: studentId,
                            supply_id: supply._id,
                            supplyItem: supply.item,
                            quantityDonated: 0,
                        },
                    };
                }
            });
            setStudentRetrieved(true);

            return insertOrUpdateObjects;
        }
    };

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
                            _id: response.data._id,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            donationCode: response.data.donation_code,
                            email: response.data.email,
                        };
                        setStudent(studentData);
                        // merge supplies with donations and create bulk write objects for update
                        const donationsForBulkWrite = initializeDonations(
                            studentData._id,
                            supplies,
                            response.data.donations
                        );
                        console.log(donationsForBulkWrite);
                        setSuppliesAndDonations(donationsForBulkWrite);
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
    }, []);

    const handleSendEmailAfterSubmitDonation = (studentDonations) => {
        DonationService.sendEmailAfterSubmitDonation(
            teacher,
            student,
            studentDonations
        );
    };

    // TODO: add automated email after student submits donation
    // contains donation code and donations they've committed
    const handleSubmit = async (submitData) => {
        const student_id = student._id;
        try {
            const response = await DonationService.updateStudentDonations(
                student_id,
                submitData
            );
            if (response.status === 200) {
                console.log('Send successful');
                let studentDonations = [];
                submitData.forEach((supply) => {
                    let supplyName = supply.supplyName;
                    let quantityDonated = supply.donationFields.quantityDonated;
                    if (quantityDonated > 0) {
                        let donation = `${supplyName} - ${quantityDonated}`;
                        studentDonations.push(donation);
                    }
                });
                handleSendEmailAfterSubmitDonation(studentDonations);
            } else {
                console.log('Send unsuccessful');
            }
            //console.log("Response returned from backend on Update Donations: " + JSON.stringify(response.data));
        } catch (err) {
            console.log('Error response received from Donations API');
            console.log(err);
            throw err;
        } finally {
            // Unregister student from donation page and take them to Thank You page
            setStudent(null);
            //navigate('/donations/students/' + student._id, { replace: true });
            navigate('/donations/teachers/' + teacher._id + '/students/' + student._id + '/thankyou', { replace: true });
        }
    };

    const handleDonationChange = (e, donationUpdater) => {
        const updatedDonation = donationUpdater(e);
        console.log(updatedDonation);
        if (
            updatedDonation.donationFields.quantityDonated >
            updatedDonation.maxAllowed
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        setSuppliesAndDonations((prevItems) =>
            prevItems.map((item) => {
                if (item.supply_id === updatedDonation.supply_id) {
                    return updatedDonation;
                } else {
                    return item;
                }
            })
        );
    };

    return (
        <>
            {studentRetrieved ? (
                <div className='dashboardHeader'>
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            Donate Supplies to {teacher.name}'s Classroom!
                            <Header.Subheader>
                                {teacher.school}
                            </Header.Subheader>
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

            <Segment>
                <SupplyTableDonate
                    suppliesAndDonations={suppliesAndDonations}
                    handleDonationChange={handleDonationChange}
                />
            </Segment>

            {studentRetrieved ? (
                <Container className='buttonRow' textAlign='center'>
                    <Button
                        primary
                        disabled={disabled}
                        type='submit'
                        size='medium'
                        content='Submit your donations'
                        onClick={() => handleSubmit(suppliesAndDonations)}
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
