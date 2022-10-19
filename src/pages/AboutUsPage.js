import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import DisplayText from '../components/DisplayText';
import { viewConfig } from '../constants';

class AboutUsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.aboutUs.textDisplay,
            imageDisplay: viewConfig.aboutUs.imageDisplay
        };


        this.onButtonClick = this.onButtonClick.bind(this)
    };

    onButtonClick = (currentView) => {
        this.setState({ textDisplay: viewConfig[currentView].textDisplay, imageDisplay: viewConfig[currentView].imageDisplay });
    }

    render() {
        return (
            <div className="AboutUsPage" data-testid="aboutUsPage" style={{ justifyContent: "space-between" }}>
                <Banner onClick={this.onButtonClick} />
                <img src={this.state.imageDisplay} alt='img-title' className="photo"/>
                <DisplayText data-testid="ourTeam" msg={this.state.textDisplay} onClick={this.onButtonClick} />
            </div>
        );
    }
}

export default AboutUsPage;