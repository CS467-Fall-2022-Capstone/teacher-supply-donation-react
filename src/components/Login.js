import React, { Component } from "react";
import { Button, Form} from "semantic-ui-react";
import './Login.css';
import Layout from "./Layout";
import { Link } from 'react-router-dom';

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
          <Button color="green" fluid size="huge" style={{marginBottom: '1em'}}>
            Login with Google
          </Button>
          <Button color="red" fluid size="huge" >
            <Link style={{color: 'white'}} to='/signup'>
              Sign up for an account
            </Link>
          </Button>

      </Layout>
    );
  }
}
export default Login;