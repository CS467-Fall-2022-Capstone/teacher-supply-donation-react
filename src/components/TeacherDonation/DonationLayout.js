import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Link, Outlet, useParams } from 'react-router-dom';
import SupplyService from '../../services/supply.service';
import logo from '../../media/logo.png';


function DonationLayout() {

    const { teacherId } = useParams();

    //console.log("Teacher id is: " + teacherId);

    const [name, setName] = useState('Waiting...');
    //const [email, setEmail] = useState('Waiting...');
    const [school, setSchool] = useState('BinaryCode High');
    const [message, setMessage] = useState('Thank you for donating to our classroom!');
    const [supplies, setSupplies] = useState([]);
    const [teacher_id, setTeacher_id] = useState(teacherId);
    const [recordRetrieved, setRecordRetrieved] = useState(false);

    useEffect(() => {

        const testSupplyData = [{
            _id: 1,
            item: 'No items read',
            totalQuantityNeeded: 'NA',
            quantityDonated: 'NA',
        }]

        const loadSupplies = async () => {
            try {
                setTeacher_id(teacherId);
                let response = await SupplyService.getSupplyRecord(teacherId);
                if (response.status === 200) {
                    console.log("RECEIVED DATA: " + JSON.stringify(response.data));
                    setRecordRetrieved(true);
                    setName(response.data.teacher.name);
                    //setEmail(response.data.teacher.email);
                    setSchool(response.data.teacher.school);
                    setMessage(response.data.teacher.message);
                    setSupplies(response.data.supplies.length > 0 ? response.data.supplies :
                        testSupplyData);

                } else {
                    setRecordRetrieved(false);
                    setName("NA");
                    //setEmail("NA");
                    setSupplies(testSupplyData)
                }
            } catch (err) {
                setRecordRetrieved(false);
                console.log("Error response received from Donations API")
                console.log(err);
                throw err;
            }
        }

        loadSupplies();
    }, [teacherId]);

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
                            {name}'s Classroom
                        </Menu.Item>
                        : <Menu.Item link as={Link} to='/donations' name='main'>
                            No Classroom Page Found
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
                <Outlet context={[name, school, message, supplies, teacher_id, recordRetrieved]} />
            </div>
        </div>
    );
}

export default DonationLayout;
