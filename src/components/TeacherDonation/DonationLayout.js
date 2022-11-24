import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import TeacherService from '../../services/teacher.service';
import logo from '../../media/TSDLogoWhite.png';
import Loading from '../Loading';

function DonationLayout() {
    // Use location so refreshed are done on every redirect
    const location = useLocation();
    // This donations layout will always have the latest
    // data for the Teacher's supplies
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState({});
    const [supplies, setSupplies] = useState([]);
    const [recordRetrieved, setRecordRetrieved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTeacherInfo() {
            try {
                const response = await TeacherService.getTeacherPublicRecord(
                    teacherId
                );
                if (response.status === 200) {
                    if (!ignore) {
                        //console.log("Raw response data is: " + JSON.stringify(response.data))
                        const teacherData = {
                            _id: response.data._id,
                            name: response.data.name,
                            school: response.data.school,
                            isPublished: response.data.isPublished,
                            message: response.data.message,
                        };

                        setTeacher(teacherData);
                        setSupplies(response.data.supplies);
                        setRecordRetrieved(true);
                        setLoading(false);
                    }
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
    }, [location.key]);

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
                        <Image centered alt='logo' src={logo} size='medium' />
                    </Menu.Item>
                    {recordRetrieved ? (
                        <Menu.Item link as={Link} name='main'>
                            {teacher.name}'s Classroom
                        </Menu.Item>
                    ) : (
                        <Menu.Item link as={Link} to='/donations' name='main'>
                            No Classroom Page Found
                        </Menu.Item>
                    )}
                    <Menu.Menu>
                        <Menu.Item link as={Link} to='/'>
                            <Icon name='home' />
                            Home Page
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
            <div className='dashboardContainer'>
                <div className='dashboardContent'>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Outlet
                            context={{
                                teacher,
                                supplies,
                                setSupplies,
                                recordRetrieved,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DonationLayout;
