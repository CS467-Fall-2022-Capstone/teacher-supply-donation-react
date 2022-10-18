import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import DisplayText from '../components/DisplayText';
import { viewConfig } from '../constants';

class HowItWorksPage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.howItWorks.textDisplay,
            imageDisplay: viewConfig.howItWorks.imageDisplay
        };


        this.onButtonClick = this.onButtonClick.bind(this)
    };

    onButtonClick = (currentView) => {
        this.setState({ textDisplay: viewConfig[currentView].textDisplay, imageDisplay: viewConfig[currentView].imageDisplay });
    }

    render() {
        return (
            <div className="HomePage" style={{ justifyContent: "space-between" }}>
                <Banner onClick={this.onButtonClick} />
                <img src={this.state.imageDisplay} alt='img-title' className="photo"/>
                <DisplayText msg={this.state.textDisplay} onClick={this.onButtonClick} />
            </div>
        );
    }
}

export default HowItWorksPage;