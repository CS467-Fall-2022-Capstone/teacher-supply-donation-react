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
        <Link style={{color: 'white'}} to='/aboutus'>
          <Button id="aboutBtn" className="ui inverted basic button" >
              About Us            
          </Button>
        </Link>
      </span>
      <span class="ui container" >
        <Link to='/home' style={{color: '#cccccc'}}>
          <h1>Teacher Supply Donation</h1>
        </Link>
      </span>
      <span class="ui container">
        <Link style={{color: '#5d5d5d'}} to='/login'>
          <Button id="loginBtn" className="ui button" >
            Sign up / Login
          </Button>
        </Link>
      </span>
    </div>
  );  
  }
}

export default Banner