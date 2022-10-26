import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";

class DisplayText extends React.Component {

    mission = "Teacher Supply Donation’s mission is to help teachers collect classroom supplies in an efficient, simple way from their local community.";

    colorText(color, text) {
        return <span style={{ color }}>{text}</span>;
    }

    displayMsg(whichMsg) {
        if (whichMsg === 'mission') {
            return (
                <div style={{ textAlign: 'center', marginLeft: '4em', marginRight: '4em' }}>
                    <h2>
                        <p>
                            {this.colorText('red', 'No')} proposals to write. {this.colorText('red', 'No')} budgets to create and manage. {this.colorText('red', 'No')} fuss.
                        </p>
                        <p>
                            {this.mission}
                        </p>
                        <p>
                            <Link style={{ color: 'white' }} to='/howitworks'>
                                <button id="howItWorksBtn" data-testid="howItWorksBtn" className='ui primary button' >
                                    {this.colorText('white', 'Read how it works.')}
                                </button>
                            </Link>
                        </p>
                    </h2>
                </div>
            );

        } else if (whichMsg === 'howItWorks') {
            return (
                <div>
                    <div style={{ textAlign: 'left', marginLeft: '4em', marginRight: '4em' }}>
                        <h3>
                            {this.colorText('red', '1.')} Teachers, sign up for a free account then create a list of classroom supplies including the number of each item needed.
                        </h3>
                        <h3>
                            {this.colorText('red', '2.')} Publish this list and receive a unique web link that you can share with students and community members.
                        </h3>
                        <h3>
                            {this.colorText('red', '3.')} Donors can view the list and select the supply item to donate. The supply list is updated automatically and donors receive an automated email notification.
                        </h3>
                        <h3>
                            {this.colorText('red', '4.')} Teachers can view the list of donors and committed supplies, sort the list, and download the list as a .csv file.
                        </h3>

                    </div>
                    <Link to='/' style={{ color: '#3d3d3d' }}>
                        <Button className="ui  button" style={{ marginTop: '3em', marginBottom: '3em', align: 'center' }}>
                            Back to home
                        </Button>
                    </Link>
                </div>
            );
        } else if (whichMsg === 'aboutUs') {
            return (
                <div>
                    {this.aboutTeam()}
                    <Link to='/' style={{ color: '#3d3d3d' }}>
                        <Button className="ui  button" style={{ marginTop: '3em', marginBottom: '3em', align: 'center' }}>
                            Back to home
                        </Button>
                    </Link>
                </div>
            );
        }
    }

    aboutTeam() {
        return (
            <div className="ui segment" style={{ marginLeft: '15rem', marginRight: '15rem' }}>
                <p style={{ textAlign: 'left' }}>Our team...</p>
            </div>
        );
    }
    render() {
        return (
            <div className='ui container'>
                {this.displayMsg(this.props.msg)}
            </div>
        );
    };

}


export default DisplayText;