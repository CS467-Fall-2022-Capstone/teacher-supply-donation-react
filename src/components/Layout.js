import React, { Component } from "react";
import { Form, Header } from "semantic-ui-react";
import "./auth.css";

class Layout extends Component {
    render() {
        return (
          <div className="auth-main">
            <div class="auth-content">
              <div className="auth-card">
                <Header as="h2" color="black" textAlign="center">
                  {this.props.header}
                </Header>
                <Form.Group size="large" className="auth-form" autoComplete="off">
                  {this.props.children}
                </Form.Group>
              </div>
            </div>
          </div>
        );
      }
}

export default Layout