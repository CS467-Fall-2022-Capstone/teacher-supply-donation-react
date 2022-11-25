import React from 'react';
import { viewConfig } from '../constants';
import { Button, Menu, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Banner extends React.Component {
    state = { currentView: viewConfig.mission };

    render() {
        return (
            <Menu fluid widths={3} className='layoutBanner'>
                <Menu.Item>
                    <Button size='large' as={Link} to='/aboutus' inverted>
                        About Us
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Image
                        as={Link}
                        to='/'
                        size='tiny'
                        centered
                        verticalAlign='middle'
                        src={viewConfig.banner.imageDisplay}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Button
                        size='large'
                        as={Link}
                        to='/login'
                        content='Sign Up/Login'
                        icon='sign in'
                        labelPosition='right'
                    />
                </Menu.Item>
            </Menu>
        );
    }
}

export default Banner;
