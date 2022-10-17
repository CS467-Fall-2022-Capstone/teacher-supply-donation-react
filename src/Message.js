import React from 'react'

class Message extends React.Component {

    mission = "Teacher Supply Donation’s mission is to help teachers collect classroom supplies in an efficient, simple way from their local community.";


    onHowBtnClick = () => {
        this.props.onClick('howItWorks');
    }
  
    colorText(color, text) {
        return <span style={{ color }}>{text}</span>;
    }

    displayMsg(whichMsg) {
        if (whichMsg === 'mission') {
            return (
                <div style={{textAlign: 'center', marginLeft: '4em', marginRight: '4em'}}>
                <h2>
                    <p>
                        {this.colorText('red', 'No')} proposals to write. {this.colorText('red', 'No')} budgets to create and manage. {this.colorText('red', 'No')} fuss.
                    </p>
                    <p>
                        {this.mission}
                    </p>
                    <p>
                        <button id="howItWorksBtn" className='ui primary button'  onClick={this.onHowBtnClick} >{this.colorText('white', 'Read how it works.')}</button>
                    </p>
                </h2>
                </div>
            );
        
        } else if (whichMsg === 'howItWorks') {
            return(
                <div style={{textAlign: 'left', marginLeft: '4em', marginRight: '4em'}}>
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

            );
        } else if (whichMsg === 'aboutUs') {
            return (
                <div>
                    {this.aboutDeveloper('Alice')}
                    {this.aboutDeveloper('Joel')}
                    {this.aboutDeveloper('Sean')}
                </div>
            );
        }
    }

    aboutDeveloper(name) {
        return (
            <div className="ui segment" style={{marginLeft: '20rem', marginRight:'20rem'}}>
                <h4 >About {name}</h4>
                <p style={{textAlign: 'left'}}>A little about me...</p>
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
    

export default Message;