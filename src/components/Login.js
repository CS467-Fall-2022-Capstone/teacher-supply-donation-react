import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import './Login.css';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useAuth } from '../services/AuthProvider';
import AuthService from '../services/auth.service';

function Login() {
    const { logIn } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [successfulReq, setSuccessfulReq] = useState({
        successful: false,
        message: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentFormData) => {
            const nextFormData = {
                ...currentFormData,
                [name]: value,
            };
            console.log(nextFormData);
            return nextFormData;
        });
    };

    const handleLogIn = async (event) => {
        event.preventDefault();
        try {
            setSuccessfulReq({ message: '', successful: false });
            const teacher = await AuthService.logIn(
                formData.email,
                formData.password
            );
            console.log(teacher);
            if (!teacher) return; // teacher is null if not found
            logIn(teacher);
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();

            setSuccessfulReq({ message: resMessage, successful: false });
            console.log(error);
            console.log('Error calling API: ' + resMessage);
            console.log(error.code, error.message);
        }
    };

    return (
        <Layout header='Log in'>
            <Form onSubmit={handleLogIn}>
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    className='auth-input-field'
                    value={formData.email}
                    name='email'
                    onChange={handleInputChange}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    className='auth-input-field'
                    value={formData.password}
                    name='password'
                    onChange={handleInputChange}
                />
                <Button
                    type='submit'
                    color='blue'
                    fluid
                    size='huge'
                    style={{ marginBottom: '1em' }}
                >
                    Login
                </Button>
            </Form>

            <GoogleLoginButton
                fluid
                iconSize='45px'
                align='center'
                style={{
                    marginLeft: 0,
                    marginBottom: '1em',
                    width: '100%',
                }}
            />
            <Link style={{ color: 'white' }} to='/signup'>
                <Button color='red' fluid size='huge'>
                    Sign up for an account
                </Button>
            </Link>
            <div>
                <h1>{successfulReq.message}</h1>
            </div>
        </Layout>
    );
}

export default Login;
