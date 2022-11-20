import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Link, Outlet, useParams } from 'react-router-dom';
import TeacherService from '../../services/teacher.service';
import logo from '../../media/logo.png';

function DonationLayout() {
    // This donations layout will always have the latest
    // data for the Teacher's supplies
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState({});
    const [supplies, setSupplies] = useState([]);
    const [recordRetrieved, setRecordRetrieved] = useState(false);

    useEffect(() => {
        async function loadTeacherInfo() {
            try {
                const response = await TeacherService.getTeacherPublicRecord(
                    teacherId
                );
                if (response.status === 200) {
                    if (!ignore) {
                        console.log("Raw response data is: " + JSON.stringify(response.data))
                        const teacherData = {
                            _id: response.data._id,
                            name: response.data.name,
                            school: response.data.school,
                            isPublished: response.data.isPublished,
                            message: response.data.message,
                        };
                        //console.log(Json.stringify(teacherData))
                        //create property for potential student record intersection
                        const tempSupplies = response.data.supplies.map((element) => ({
                            ...element,
                            quantityDonatedByStudent: 0
                          }));

                        setTeacher(teacherData);
                        setSupplies(tempSupplies);
                        
                    }
                    setRecordRetrieved(true);
                }
            } catch (err) {
                console.error(err);
            }
        }
        let ignore = false;
        loadTeacherInfo();
        return () => {
            // cleanup code to ensure no race conditions
            ignore = true;
        };
        // call useEffect on re-render if there are any changes to teacher
    }, [teacherId]);

    useEffect(() => {
        console.log("Current supplies array is: " + JSON.stringify(supplies))
    }, [supplies]);

    return (
        <div className='container'>
            <div className='sidebarContainer'>
                <Menu
                    className='nav'
                    icon='labeled'
                    fluid
                    borderless
                    inverted
                    vertical
                >
                    <Menu.Item>
                        <Image centered alt='logo' src={logo} size='small' />
                    </Menu.Item>
                    {recordRetrieved ? (
                        <Menu.Item link as={Link} to='/donations' name='main'>
                            {teacher.name}'s Classroom
                        </Menu.Item>
                    ) : (
                        <Menu.Item link as={Link} to='/donations' name='main'>
                            No Classroom Page Found
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
                    <Outlet
                        context={{
                            teacher,
                            supplies,
                            setSupplies,
                            recordRetrieved,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default DonationLayout;
