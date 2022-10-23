import React from 'react';
import '../App.css';
import { viewConfig } from '../constants';
import Banner from '../components/Banner';
import Login from '../components/Login';



class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.login.textDisplay,
            imageDisplay: viewConfig.login.imageDisplay
        };
    };

    onButtonClick = (currentView) => {
        this.setState({ textDisplay: viewConfig[currentView].textDisplay, imageDisplay: viewConfig[currentView].imageDisplay });
    }

    render() {
        return (
            <div className="HomePage" style={{ justifyContent: "space-between" }}>
                <Banner onClick={this.onButtonClick} />
                <img src={this.state.imageDisplay} alt='img-title' className="photo"/>
                <Login />
            </div>
        );
    }
}

export default LoginPage;