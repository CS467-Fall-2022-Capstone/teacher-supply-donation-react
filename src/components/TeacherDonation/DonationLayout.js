import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import {
    Link,
    Outlet,
    useParams,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import TeacherService from '../../services/teacher.service';
import logo from '../../media/border_logo_v2_transparent.png';
import Loading from '../Loading';

function DonationLayout() {
    const navigate = useNavigate();
    // Use location so refreshed are done on every redirect
    const location = useLocation();
    // This donations layout will always have the latest
    // data for the Teacher's supplies
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState({});
    const [supplies, setSupplies] = useState([]);
    const [recordRetrieved, setRecordRetrieved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState(null);

    const handleGoHome = () => {
        // Remove student state, will require student to re-enter their Donation Code
        setStudent(null);
        navigate('/', { replace: true });
    };

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
        <div className='mainContainer'>
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

                    <Menu.Item link name='main'>
                        {teacher.name}'s Classroom
                    </Menu.Item>

                    <Menu.Menu>
                        <Menu.Item link onClick={() => handleGoHome()}>
                            <Icon name='home' />
                            Home Page
                        </Menu.Item>
                        <Menu.Item
                            link
                            as={Link}
                            to={
                                student
                                    ? `/donations/teachers/${teacherId}/students/${student._id}`
                                    : `/donations/teachers/${teacherId}`
                            }
                            active={
                                student
                                    ? location.pathname ===
                                      `/donations/teachers/${teacherId}/students/${student._id}`
                                    : location.pathname ===
                                      `/donations/teachers/${teacherId}`
                            }
                        >
                            <Icon name='list' />
                            Supplies/Donations List
                        </Menu.Item>
                        {student && (
                            <Menu.Item
                                link
                                as={Link}
                                to={`/donations/teachers/${teacherId}/students/${student._id}/profile`}
                                active={
                                    location.pathname ===
                                    `/donations/teachers/${teacherId}/students/${student._id}/profile`
                                }
                            >
                                <Icon name='user' />
                                Edit Student Profile
                            </Menu.Item>
                        )}
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
                                student,
                                setStudent,
                                setLoading,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DonationLayout;
