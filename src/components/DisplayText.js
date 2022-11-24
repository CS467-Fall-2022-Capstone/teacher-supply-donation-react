import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";

class DisplayText extends React.Component {

    mission = "Teacher Supply Donation’s mission is to help teachers collect classroom supplies in an efficient, simple way \
    from their local community.";

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
                    <div style={{ textAlign: 'left', marginLeft: '4em', marginRight: '4em' }}>
                        <h3>
                            The Teacher Supply Donation web app is a collaboration among three developers - Alice Fisher, 
                            Sean Park, and Joel Swenddal - who developed this project as part of the Capstone course in the
                             Oregon State University Postbaccalaureate Computer Science program. They will all graduate from 
                             the program in December 2022 and hope you enjoy this TSD application!
                        </h3>
                        <h4>
                            {this.colorText('red', '*')} Alice Fisher was a classroom teacher for 18 years - 12 years teaching
                             middle and high school math and 6 years teaching HS CS. She graduated from Rice University with a 
                             BA in history and teaching certification in mathematics. She earned a Master's degree in mathematics 
                             and then decided to pursue a post-bac in CS out of curiosity and recently accepted a full-time software 
                             engineering position at Code.org. In the past, she had to buy classroom supplies out-of-pocket such as 
                             a clock, electric pencil sharpener, countless tissue boxes. This project arises from her past classroom 
                             experiences and is dedicated to committed teachers who go above and beyond.
                        </h4>
                        <h4>
                            {this.colorText('red', '*')} Sean Park is currently a Corporate Investigations and Internal Audit Manager 
                            living in Southern California. He graduated in 2012 with a major in Philosophy and minor in Law and 
                            Society from University of California, San Diego. He joined the OSU post-bac program to pursue his passion 
                            in tech. He accepted a Software Engineer role at Paylocity!  When he's not working he loves binging movies 
                            and shows, going to concerts, and listening to vinyl records.
                        </h4>
                        <h4>
                            {this.colorText('red', '*')} Joel Swenddal is
                        </h4>

                    </div>
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
                <p style={{ textAlign: 'left' }}>{this.aboutUs}</p>
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