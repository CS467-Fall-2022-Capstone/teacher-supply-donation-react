import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Link, Outlet, useParams } from 'react-router-dom';
import DonationService from '../../services/donations.service';
import logo from '../../media/border_logo_v2_transparent.png';

function ThankyouLayout() {
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
        <div className='mainContainer'>
            <div className='sidebarContainer'>
                <Menu
                    icon='labeled'
                    className='nav'
                    fluid
                    borderless
                    inverted
                    vertical
                >
                    <Menu.Item>
                        <Image centered alt='logo' src={logo} size='medium' />
                    </Menu.Item>
                    {recordRetrieved ? (
                        <Menu.Item link as={Link} to='/donations' name='main'>
                            Thank You!
                        </Menu.Item>
                    ) : (
                        <Menu.Item link as={Link} to='/donations' name='main'>
                            No Record Found
                        </Menu.Item>
                    )}
                    <Menu.Menu>
                        <Menu.Item link as={Link} to='/' name='settings'>
                            <Icon name='home' />
                            Home Page
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
            <div className='dashboardContainer'>
                <div className='dashboardContent'>
                    <Outlet context={[student, donations, recordRetrieved]} />
                </div>
            </div>
        </div>
    );
}

export default ThankyouLayout;
