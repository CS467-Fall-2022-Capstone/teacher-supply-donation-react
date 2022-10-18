import React from 'react';
import './App.css';
import Banner from './components/Banner';
import DisplayText from './components/DisplayText';
import Login from './components/Login';
import Signup from './components/Signup';
import {viewConfig} from './constants';

class App extends React.Component {

  state = {
    textDisplay: viewConfig.mission.textDisplay,
    imageDisplay: viewConfig.mission.imageDisplay
  };

  onButtonClick = (currentView) => {
    this.setState({ textDisplay: viewConfig[currentView].textDisplay, imageDisplay: viewConfig[currentView].imageDisplay});
  }

  renderContent = () => {
    let textDisplay = this.state.textDisplay;
    if (textDisplay === 'login')
    {
      return <Login onClick={this.onButtonClick} />
    } else if (textDisplay === 'signup') {
      return <Signup onClick={this.onButtonClick} />
    }
    else {
      return <DisplayText msg={this.state.textDisplay} onClick={this.onButtonClick}/>;
    }
  }

  render() {
    return (
      <div className="App" style={{ justifyContent: "space-between" }}>
          <Banner onClick={this.onButtonClick} />
          < img src={this.state.imageDisplay} alt='img-title' className="photo"/>
          {this.renderContent()}
          
      </div>
    );    
  }
}

export default App;
