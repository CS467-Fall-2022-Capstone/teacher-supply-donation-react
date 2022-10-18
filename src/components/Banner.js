import React from 'react'
import './Banner.css'
import {viewConfig} from '../constants';
import { Button } from "semantic-ui-react";

class Banner extends React.Component {

  state = { currentView: viewConfig.mission };

  onAboutBtnClick = () => {
    this.props.onClick('aboutUs');
  }
  
  onLoginBtnClick = () => {
    this.props.onClick('login');
  }

  onTitleClick = () => {
    this.props.onClick('mission');
  }

  render() {
    return (
    <div className="Banner">
      <span class="ui container">
        <Button id="aboutBtn" className="ui inverted basic button" onClick={this.onAboutBtnClick}>About Us</Button>
      </span>
      <span class="ui container" onClick={this.onTitleClick}>
        <h1>Teacher Supply Donation</h1>
      </span>
      <span class="ui container">
        <Button id="loginBtn" className="ui button" onClick={this.onLoginBtnClick}>Sign up / Login</Button>
      </span>
    </div>
  );  
  }
}

export default Banner