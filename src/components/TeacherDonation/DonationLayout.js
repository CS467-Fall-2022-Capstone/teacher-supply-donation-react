import React, { useState, useEffect } from 'react';
import { Image, Menu, Icon } from 'semantic-ui-react';
import { Navigate, Link, Outlet, useParams } from 'react-router-dom';
import TeacherService from '../../services/teacher.service';
import logo from '../../media/logo.png';


function DonationLayout() {

    const { teacherId } = useParams();

    console.log("Teacher id is: " + teacherId);

    //const [teacher, setTeacher] = useState('John Doe');
    const [name, setName] = useState('John Doe');
    const [teacher, setTeacher] = useState({});
    

    //fetch the teacher data from the backend
    useEffect(() => {
        TeacherService.getTeacherPublicRecord(teacherId)
            .then((response) => {
                if (response.status === 200) {
                    console.log("React app received teacher data response");
                    console.log(JSON.stringify(response.data));
                    setTeacher(response.data);
                } else {
                    console.log("Another (non 200) response status received: " + JSON.stringify(response.status));
                }
            }).catch((err) => {
                console.log("Error response received from backend")
                console.log(err);
                throw err;
            })
    }, []
    );

    return (
        <div className='container'>
            <div className='sidebar'>
                <Menu icon='labeled' fluid borderless inverted vertical>
                    <Menu.Item>
                        <Image
                            centered
                            alt='logo'
                            src={logo}
                            size='small'
                        />
                    </Menu.Item>
                    <Menu.Item link as={Link} to='/donations' name='main'>
                        {name}'s Classroom Page
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
                <Outlet context={[teacher, setTeacher]} />
            </div>
        </div>
    );
}

export default DonationLayout;
