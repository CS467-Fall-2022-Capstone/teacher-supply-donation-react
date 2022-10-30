import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import Layout from "./Layout";
import { Link } from 'react-router-dom';


function Signup() {

  function onLoginBtnClick(e) {
    //e.preventDefault();
    //setActiveItem(e.target.name);
    console.log('On login button was clicked');
  };


  return (
    <Layout header="Sign up to get started">
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="User name"
        className="auth-input-field"
      />
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

      <Button color="blue" fluid size="huge" style={{ marginBottom: '1em' }}>
        Sign up
      </Button>
      <Link style={{ color: 'white' }} to='/login'>
        <Button color="red" fluid size="huge" onClick={onLoginBtnClick} >
          Already have account? Log in
        </Button>
      </Link>
    </Layout>
  )
}

/*
class Signup extends Component {
  constructor(props) {
    super();
    this.state = {}

  }

  onLoginBtnClick =(e) => {
    //e.preventDefault();
    //setActiveItem(e.target.name);
    console.log('This is ', this);
  };

  render() {
    return (
      <Layout header="Sign up to get started">
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="User name"
          className="auth-input-field"
        />
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

        <Button color="blue" fluid size="huge" style={{ marginBottom: '1em' }}>
          Sign up
        </Button>
        <Link style={{ color: 'white' }} to='/login'>
          <Button color="red" fluid size="huge" onClick={this.onLoginBtnClick}>
            Already have account? Log in
          </Button>
        </Link>
      </Layout>
    );
  }
}
*/

export default Signup