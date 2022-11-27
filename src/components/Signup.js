import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import Layout from './Layout';
import { Link, Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useAuth } from '../services/AuthProvider';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useGoogleLogin } from '@react-oauth/google';

function Signup() {
    const { logIn, teacher } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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

            return nextFormData;
        });
    };

    async function handleSignup(event) {
        event.preventDefault();
        try {
            setSuccessfulReq({ message: '', successful: false });
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords Do Not Match!');
            } else {
                const teacher = await AuthService.signUp(
                    formData.name,
                    formData.email,
                    formData.password
                );

                if (!teacher) return;
                setSuccessfulReq({
                    message: 'Request succeeded',
                    successful: true,
                });
                logIn(teacher);
            }
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
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const teacher = AuthService.googleLogin(tokenResponse);
            if (!teacher) return; // teacher is null if not found
            logIn(teacher);
        },
        onError: (errorResponse) => {
            const resMessage =
                (errorResponse.response &&
                    errorResponse.response.data &&
                    errorResponse.response.data.error) ||
                errorResponse.message ||
                errorResponse.toString();

            setSuccessfulReq({ message: resMessage, successful: false });
            console.log(errorResponse);
            console.log('Error calling API: ' + resMessage);
            console.log(errorResponse.code, errorResponse.message);
        },
    });

    if (teacher) {
        return <Navigate to='/teachers/dashboard' />;
    }

    return (
        <Layout header='Sign up to get started'>
            <Segment raised>
                <Form onSubmit={handleSignup}>
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Full Name'
                        className='auth-input-field'
                        value={formData.name}
                        name='name'
                        onChange={handleInputChange}
                    />
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
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm Password'
                        type='password'
                        className='auth-input-field'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />

                    <Button
                        type='submit'
                        color='blue'
                        fluid
                        size='huge'
                        style={{ marginBottom: '1em' }}
                    >
                        Sign up
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
                    onClick={() => googleLogin()}
                />

                <Link style={{ color: 'white' }} to='/login'>
                    <Button color='red' fluid size='huge'>
                        Already have account? Log in
                    </Button>
                </Link>
                <div>
                    <h1>{successfulReq.message}</h1>
                </div>
            </Segment>
        </Layout>
    );
}

export default Signup;
