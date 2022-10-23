import React, { Component } from "react";
import { Button, Form} from "semantic-ui-react";
import './Login.css';
import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons'

class Login extends Component {

  render() {
    return (
      <Layout header="Log in">
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          className="auth-input-field"
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          className="auth-input-field"
        />


          <Button color="blue" fluid size="huge" style={{marginBottom: '1em'}}>
            Login
          </Button>
          <GoogleLoginButton fluid iconSize="45px" align="center" style={{marginLeft: 0, marginBottom: '1em', width: '100%'}}/>
          <Link style={{color: 'white'}} to='/signup'>
            <Button color="red" fluid size="huge" >
              Sign up for an account
            </Button>
          </Link>

      </Layout>
    );
  }
}
export default Login;