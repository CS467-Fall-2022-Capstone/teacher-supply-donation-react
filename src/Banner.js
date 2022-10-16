import React from 'react'
import './Banner.css'
function Banner() {

  return (
    <div className="Banner">
      <span className="ui container">
        <button class="ui inverted basic button">About Us</button>
      </span>
      <span className="ui container">
        <h1>Teacher Supply Donation</h1>
      </span>
      <span className="ui container">
        <button class="ui button">Sign up / Login</button>
      </span>
    </div>
  );
}

export default Banner