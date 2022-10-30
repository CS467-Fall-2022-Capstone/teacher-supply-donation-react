import React from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Navigate, Link, Outlet } from 'react-router-dom';

function DashboardLayout() {
    const logOut = () => {
        // TODO: implement sign out process
        // fetch to backend authenticate
        // if authenticated
        console.log('Sign Out');
        Navigate('/teachers');
    };

    return (
        <div className='container'>
            <div className='sidebar'>
                <Menu icon='labeled' fluid borderless inverted vertical>
                    <Menu.Item>
                        <Image
                            centered
                            alt='logo'
                            src='../logo.png'
                            size='small'
                        />
                    </Menu.Item>
                    <Menu.Item link as={Link} to='/teacher' name='main'>
                        Main Dashboard
                    </Menu.Item>
                    <Menu.Item
                        link
                        as={Link}
                        to='/teacher/createList'
                        name='createList'
                    >
                        Create Supplies List
                    </Menu.Item>
                    <Menu.Item
                        link
                        as={Link}
                        to='/teacher/donorList'
                        name='donorList'
                    >
                        Donor List
                    </Menu.Item>
                    <Menu.Menu>
                        <Menu.Item
                            link
                            as={Link}
                            to='/teacher/settings'
                            name='settings'
                        >
                            <Icon name='setting' />
                            Settings
                        </Menu.Item>
                        <Menu.Item
                            link
                            as={Link}
                            name='logOut'
                            onClick={logOut}
                        >
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
