import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Layout from './Layout';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './../services/auth.service';

function Signup() {
    const navigate = useNavigate();

    const [validPassword, setValidPassword] = useState(true);

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
            console.log(nextFormData);
            return nextFormData;
        });
    };

    async function handleSignup(event) {
        try {
            event.preventDefault();
            setSuccessfulReq({ message: '', successful: false });

            if (formData.password !== formData.confirmPassword) {
                alert('Passwords Do Not Match!');
            } else {
                const response = await AuthService.signup(
                    formData.name,
                    formData.email,
                    formData.password
                );
                if (response.status === 201) {
                    const authenticated = AuthService.checkAuthenticated();
                    console.log('New user is authenticated:' + authenticated);
                    setSuccessfulReq({
                        message: 'Request succeeded',
                        successful: true,
                    });
                    //redirect to individual dashboard (currently just general teacher dash endpoint)
                    if (authenticated) {
                        navigate('/teachers');
                    }
                }
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

    return (
        <Layout header='Sign up to get started'>
            <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='User name'
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
                onClick={handleSignup}
            >
                Sign up
            </Button>
            <Link style={{ color: 'white' }} to='/login'>
                <Button color='red' fluid size='huge'>
                    Already have account? Log in
                </Button>
            </Link>
            <div>
                <h1>{successfulReq.message}</h1>
            </div>
        </Layout>
    );
}

export default Signup;
