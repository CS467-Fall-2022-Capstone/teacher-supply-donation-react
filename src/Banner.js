import React from 'react'
import './App.css'
import {viewConfig} from './constants';


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
    <div className="Banner" >
      <span className="ui container">
        <button id="aboutBtn" className="ui inverted basic button" onClick={this.onAboutBtnClick}>About Us</button>
      </span>
      <span className="ui container" onClick={this.onTitleClick}>
        <h1>Teacher Supply Donation</h1>
      </span>
      <span className="ui container">
        <button id="loginBtn" className="ui button" onClick={this.onLoginBtnClick}>Sign up / Login</button>
      </span>
    </div>
  );  
  }
}

export default Banner