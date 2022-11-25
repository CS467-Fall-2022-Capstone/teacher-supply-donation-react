import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import DisplayText from '../components/DisplayText';
import { viewConfig } from '../constants';
import { Header, Segment } from 'semantic-ui-react';

class HowItWorksPage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.howItWorks.textDisplay,
            imageDisplay: viewConfig.howItWorks.imageDisplay,
        };

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick = (currentView) => {
        this.setState({
            textDisplay: viewConfig[currentView].textDisplay,
            imageDisplay: viewConfig[currentView].imageDisplay,
        });
    };

    render() {
        return (
            <div
                className='HomePage'
                style={{ justifyContent: 'space-between' }}
            >
                <Banner onClick={this.onButtonClick} />
                <Segment basic>
                    <Header as='h2' dividing>
                        How It Works
                    </Header>
                    <DisplayText
                        msg={this.state.textDisplay}
                        onClick={this.onButtonClick}
                    />
                </Segment>
            </div>
        );
    }
}

export default HowItWorksPage;
