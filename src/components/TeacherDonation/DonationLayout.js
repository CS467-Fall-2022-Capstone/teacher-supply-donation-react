import React, { useState } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Navigate, Link, Outlet } from 'react-router-dom';


function DonationLayout() {

    const [teacher, setTeacher] = useState('John Doe');

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
                    <Menu.Item link as={Link} to='/donations' name='main'>
                        {teacher}'s Classroom Page
                    </Menu.Item>
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
                <Outlet />
            </div>
        </div>
    );
}

export default DonationLayout;
