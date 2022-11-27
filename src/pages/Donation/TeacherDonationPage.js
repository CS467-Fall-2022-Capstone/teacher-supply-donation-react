import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import SupplyTableSimple from '../../components/TeacherDonation/SupplyTableSimple.js';
import {
    Header,
    Button,
    Container,
    Message,
    Divider,
    Segment,
} from 'semantic-ui-react';
import DonationModal from '../../components/TeacherDonation/DonationModal';
import DonationService from '../../services/donations.service';

function TeacherDonationPage() {
    let navigate = useNavigate();
    const { teacher, supplies, recordRetrieved } = useOutletContext();

    const handleNewDonorSubmit = async (fName, lName, email) => {
        const studentData = {
            firstName: fName,
            lastName: lName,
            email: email,
            teacher_id: teacher._id,
        };
        try {
            const response = await DonationService.createNewStudentRecord(
                studentData
            );
            if (response.status === 201) {
                const student_id = response.data.student_id;
                navigate(`students/${student_id}`, { replace: true });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleReturningDonorSubmit = (student_id) => {
        if (student_id) {
            navigate(`students/${student_id}`, { replace: true });
        } else if (student_id === undefined) {
            console.log('Student could not be found by Donation Code');
        }
    };

    return (
        <>
            <div className='dashboardHeader'>
                {recordRetrieved ? (
                    <>
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
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>

            <Header size='large'> Supplies List</Header>
            <Divider fitted />
            <Segment raised color='blue'>
                <SupplyTableSimple supplies={supplies} />
            </Segment>

            {recordRetrieved ? (
                <>
                    <Container className='buttonRow' textAlign='center'>
                        <DonationModal
                            handleNewDonorSubmit={handleNewDonorSubmit}
                            handleReturningDonorSubmit={
                                handleReturningDonorSubmit
                            }
                        />
                    </Container>
                </>
            ) : (
                <>
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
            )}
        </>
    );
}

export default TeacherDonationPage;
