import React from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../services/AuthProvider';

function DashboardLayout() {
    const { teacher, logOut } = useAuth();

    if (!teacher) {
        return <Navigate to='/login' replace />;
    }

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
                        <Menu.Item link name='logOut' onClick={() => logOut()}>
                            <Icon name='log out' />
                            Log Out
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
            <div className='dashboard'>
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;
