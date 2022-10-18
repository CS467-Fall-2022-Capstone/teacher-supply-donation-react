import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import DisplayText from '../components/DisplayText';
import { viewConfig } from '../constants';

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.mission.textDisplay,
            imageDisplay: viewConfig.mission.imageDisplay
        };
    };

    render() {
        return (
            <div className="HomePage" style={{ justifyContent: "space-between" }}>
                <Banner />
                <img src={this.state.imageDisplay} alt='img-title' className="photo"/>
                <DisplayText msg={this.state.textDisplay} onClick={this.onButtonClick} />
            </div>
        );
    }
}

export default HomePage;