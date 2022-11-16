import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../services/AuthProvider';
import TeacherService from '../../services/teacher.service.js';

function DashboardLayout() {
    const { teacher, setTeacher, logOut } = useAuth();
    const [supplies, setSupplies] = useState([]);
    const [students, setStudents] = useState([]);
    const [metrics, SetMetrics] = useState({});

    useEffect(() => {
        async function loadTeacherInfo() {
            try {
                const response = await TeacherService.getTeacherRecord(
                    teacher.teacher_id,
                    teacher.token
                );
                if (response.status === 200) {
                    if (!ignore) {
                        setSupplies(response.data.supplies);
                        setStudents(response.data.students);
                        SetMetrics(response.data.metrics);
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
        // call useEffect on re-render if there are any changes to teacher
    }, [teacher]);

    if (!teacher) {
        return <Navigate to='/login' replace />;
    } else {
        return (
            <div className='container'>
                <div className='sidebar'>
                    <Menu icon='labeled' fluid borderless inverted vertical>
                        <Menu.Item>
                            <Image
                                centered
                                alt='logo'
                                src='../../logo.png'
                                size='small'
                            />
                        </Menu.Item>
                        <Menu.Item
                            link
                            as={Link}
                            to='/teachers/dashboard'
                            name='main'
                        >
                            Supplies
                        </Menu.Item>
                        <Menu.Item
                            link
                            as={Link}
                            to='/teachers/dashboard/donors'
                            name='donorList'
                        >
                            Donors
                        </Menu.Item>
                        <Menu.Menu>
                            <Menu.Item
                                link
                                as={Link}
                                to='/teachers/dashboard/settings'
                                name='settings'
                            >
                                <Icon name='setting' />
                                Settings
                            </Menu.Item>
                            <Menu.Item
                                link
                                name='logOut'
                                onClick={() => logOut()}
                            >
                                <Icon name='log out' />
                                Log Out
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </div>
                <div className='dashboard'>
                    <Outlet
                        context={{
                            supplies,
                            setSupplies,
                            students,
                            setStudents,
                            teacher,
                            setTeacher,
                            metrics,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default DashboardLayout;
