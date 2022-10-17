import React, { Component } from "react";
import { Button, Form} from "semantic-ui-react";
import './Login.css';
import Layout from "./Layout";

class Login extends Component {

  onSignupBtnClick = () => {
     this.props.onClick('signup');
  }

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
          <Button color="red" fluid size="huge" onClick={this.onSignupBtnClick}>
          Sign up for an account
          </Button>

      </Layout>
    );
  }
}
export default Login;