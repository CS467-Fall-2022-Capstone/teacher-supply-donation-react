import React, { Component } from "react";
import { Button, Form} from "semantic-ui-react";
import Layout from "./Layout";

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
              <Button color="red" fluid size="huge" >
                Already have account? Log in
              </Button>
          </Layout>
        );
      }
}
export default Signup