import React, { useState } from 'react';
import { Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function SideBar() {
    const [activeItem, setActiveItem] = useState('main');

    const handleClick = (e) => {
        e.preventDefault();
        setActiveItem(e.target.name);
    };

    const logOut = () => {
        // TODO: implement sign out process
        console.log('Sign Out');
    };

    return (
        <Menu
            fixed='left'
            borderless
            inverted
            vertical
        >
            <Menu.Item>
                <Image centered alt='logo' src='logo.png' size='small' />
            </Menu.Item>
            <Menu.Item
                link
                as={Link}
                to='/dashboard'
                name='main'
                active={activeItem === 'main'}
                onClick={handleClick}
            />
            <Menu.Item
                link
                as={Link}
                to='/createList'
                name='createList'
                active={activeItem === 'createList'}
                onClick={handleClick}
            />
            <Menu.Item
                link
                as={Link}
                to='/donorList'
                name='donorList'
                active={activeItem === 'donorList'}
                onClick={handleClick}
            />
            <Menu.Menu>
                <Menu.Item
                    link
                    as={Link}
                    to='/settings'
                    name='settings'
                    active={activeItem === 'settings'}
                    onClick={handleClick}
                />
                <Menu.Item
                    link
                    as={Link}
                    to='/'
                    name='logOut'
                    onClick={logOut}
                />
            </Menu.Menu>
        </Menu>
    );
}

export default SideBar;
