import React from 'react'
import './Banner.css'
import {viewConfig} from '../constants';
import { Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class Banner extends React.Component {

  state = { currentView: viewConfig.mission };

  render() {
    return (
    <div className="Banner">
      <span class="ui container">
        <Button id="aboutBtn" className="ui inverted basic button" >
          <Link style={{color: 'white'}} to='/aboutus'>
            About Us
          </Link>
        </Button>
      </span>
      <span class="ui container" >
      <Link to='/home' style={{color: '#cccccc'}}>
      <h1>Teacher Supply Donation</h1>
                        </Link>
        
      </span>
      <span class="ui container">
        <Button id="loginBtn" className="ui button" >
          <Link style={{color: '#5d5d5d'}} to='/login'>
            Sign up / Login
          </Link>
        </Button>
      </span>
    </div>
  );  
  }
}

export default Banner