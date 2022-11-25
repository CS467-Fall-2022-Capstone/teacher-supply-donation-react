import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import DisplayText from '../components/DisplayText';
import { viewConfig } from '../constants';
import { Header, Segment } from 'semantic-ui-react';

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.mission.textDisplay,
            imageDisplay: viewConfig.mission.imageDisplay,
        };
    }

    render() {
        return (
            <div
                className='HomePage'
                style={{ justifyContent: 'space-between' }}
            >
                <Banner />
                <Segment basic>
                    <Header as='h1' dividing>
                        Welcome to Teacher Supply Donation
                    </Header>
                </Segment>

                <DisplayText
                    msg={this.state.textDisplay}
                    onClick={this.onButtonClick}
                />
            </div>
        );
    }
}

export default HomePage;
