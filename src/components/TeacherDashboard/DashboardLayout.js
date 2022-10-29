import React from 'react';
import { Image, Menu } from 'semantic-ui-react';
import { Navigate, Link, Outlet } from 'react-router-dom';

function DashboardLayout() {
    const logOut = () => {
        // TODO: implement sign out process
        console.log('Sign Out');
        Navigate('/');
    };

    return (
        <div className='container'>
            <div className='sidebar'>
                <Menu borderless inverted vertical fluid>
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
                            Settings
                        </Menu.Item>
                        <Menu.Item
                            link
                            as={Link}
                            name='logOut'
                            onClick={logOut}
                        >
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
