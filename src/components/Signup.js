import React, { Component } from "react";
import { Button, Form} from "semantic-ui-react";
import Layout from "./Layout";
import { Link } from 'react-router-dom';

class Signup extends Component {

    render() {
        return (
          <Layout header="Sign up to get started">
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              className="auth-input-field"
            />
    

              <Button color="blue" fluid size="huge" style={{marginBottom: '1em'}}>
                Sign up
              </Button>
              <Button color="red" fluid size="huge" onClick={this.onLoginBtnClick}>
                <Link style={{color: 'white'}} to='/login'>
                  Already have account? Log in
                </Link>
              </Button>
          </Layout>
        );
      }
}
export default Signup