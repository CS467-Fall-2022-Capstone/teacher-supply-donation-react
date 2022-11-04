import React from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import AuthService from '../../services/auth.service';

function DashboardLayout() {
    let navigate = useNavigate();

    const isAuthenticated = AuthService.checkAuthenticated();

    if (!isAuthenticated) {
        navigate('/login');
    }

    const logOut = () => {
        // TODO: implement sign out process
        // fetch to backend authenticate
        // if authenticated
        AuthService.logout();
        console.log('Sign Out');
        navigate('/login', { replace: true });
    };

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
                        {/* Note: Do we need a link to home? An authenticated user wouldn't have any use to go home
                        My thought process was that the landing pages were for unauthenticated users */}
                        {/* <Menu.Item link as={Link} to='/' name='settings'>
                            <Icon name='home' />
                            Home Page
                        </Menu.Item> */}
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
