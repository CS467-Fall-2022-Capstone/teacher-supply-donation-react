import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import DisplayText from '../components/DisplayText';
import { viewConfig } from '../constants';
import { Header, Segment } from 'semantic-ui-react';

class AboutUsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            textDisplay: viewConfig.aboutUs.textDisplay,
            imageDisplay: viewConfig.aboutUs.imageDisplay,
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
                className='AboutUsPage'
                data-testid='aboutUsPage'
                style={{ justifyContent: 'space-between' }}
            >
                <Banner onClick={this.onButtonClick} />
                <Segment basic>
                    <Header as='h2' dividing>
                        About the Team
                    </Header>
                    <DisplayText
                        data-testid='ourTeam'
                        msg={this.state.textDisplay}
                        onClick={this.onButtonClick}
                    />
                </Segment>
            </div>
        );
    }
}

export default AboutUsPage;
