import React from 'react';
import './App.css';
import Banner from './Banner';
import ImageTitle from './ImageTitle';
import Message from './Message';
import {viewConfig} from './constants';

class App extends React.Component {

  
  state = {
    textDisplay: viewConfig.mission.textDisplay,
    imageDisplay: viewConfig.mission.imageDisplay
  };

  onButtonClick = (currentView) => {
    this.setState({ textDisplay: viewConfig[currentView].textDisplay, imageDisplay: viewConfig[currentView].imageDisplay});
  }

  render() {
    return (
      <div className="App" style={{ justifyContent: "space-between" }}>
          <Banner onClick={this.onButtonClick} />
          <ImageTitle img={this.state.imageDisplay} /> 
          <Message msg={this.state.textDisplay} onClick={this.onButtonClick}/>
      </div>
    );    
  }
}

export default App;
