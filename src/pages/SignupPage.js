import React from 'react';
import '../App.css';
import { viewConfig } from '../constants';
import Banner from '../components/Banner';
import Signup from '../components/Signup';


class SignupPage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.signup.textDisplay,
            imageDisplay: viewConfig.signup.imageDisplay
        };
    };

    render() {
        return (
            <div className="HomePage" style={{ justifyContent: "space-between" }}>
                <Banner onClick={this.onButtonClick} />
                <img src={this.state.imageDisplay} alt='img-title' className="photo"/>
                <Signup />
            </div>
        );
    }
}

export default SignupPage;