import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Link, Outlet, useParams } from 'react-router-dom';
import DonationService from '../../services/donations.service';
import logo from '../../media/logo.png';


function ThankyouLayout() {

    const { studentId } = useParams();

    const [student_id, setStudentId] = useState(studentId);
    const [donations, setDonations] = useState([]);
    const [recordRetrieved, setRecordRetrieved] = useState(false);

    useEffect(() => {

        const testDonationData = {
            donations: [
                {donation_id: "123", item: "box of chalk", quantityDonated: 1},
                {donation_id: "235", item: "package of markers", quantityDonated: 2}
            ]
        }

        const loadDonations = async () => {
            try {
                setStudentId(studentId ? studentId: "234");
                let response = await DonationService.getStudentDonations(studentId);
                if (response.status === 200) {
                    console.log("RECEIVED DATA: " + JSON.stringify(response.data));
                    setRecordRetrieved(true);
                    //setDonations(response.data.donations);
                    setDonations(testDonationData.donations)

                } else {
                    setRecordRetrieved(false);
                    //setName("NA");
                    setDonations(testDonationData)
                    console.log("UNSUCCESSFUL REQUEST. Status code: " + JSON.stringify(response.status));
        
                }
            } catch (err) {
                setRecordRetrieved(false);
                console.log("Error response received from Donations API")
                console.log(err);
                throw err;
            }
        }

        loadDonations();
    }, [studentId]);

    return (
        <div className='container'>
            <div className='sidebar'>
                <Menu icon='labeled' fluid borderless inverted vertical>
                    <Menu.Item>
                        <Image
                            centered
                            alt='logo'
                            src={logo}
                            size='small'
                        />
                    </Menu.Item>
                    {recordRetrieved
                        ? <Menu.Item link as={Link} to='/donations' name='main'>
                            Spock's Classroom
                        </Menu.Item>
                        : <Menu.Item link as={Link} to='/donations' name='main'>
                            No Record Found
                        </Menu.Item>
                    }
                    <Menu.Menu>
                        <Menu.Item
                            link
                            as={Link}
                            to='/'
                            name='settings'
                        >
                            <Icon name='home' />
                            Home Page
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
            <div className='dashboard'>
                <Outlet context={[student_id, donations, recordRetrieved]} />
            </div>
        </div>
    );
}

export default ThankyouLayout;
