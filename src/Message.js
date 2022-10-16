import React from 'react'

const mission = "Teacher Supply Donation’s mission is to help teachers collect classroom supplies in an efficient, simple way from their local community.";

function colorText(color, text) {
    return <span style={{ color }}>{text}</span>;
}
function displayMsg(whichMsg) {
    if (whichMsg === 'mission') {
        return (
            <div style={{textAlign: 'center', marginLeft: '4em', marginRight: '4em'}}>
            <h2>
                <p>
                    {colorText('red', 'No')} proposals to write. {colorText('red', 'No')} budgets to create and manage. {colorText('red', 'No')} fuss.
                </p>
                <p>
                    {mission}
                </p>
                <p>
                    <button className='ui primary button'> {colorText('white', 'Read how it works.')}</button>
                   </p>
            </h2>
            </div>
        );
       
    } else if (whichMsg === 'how-it-works') {
        return(
            <div style={{textAlign: 'left', marginLeft: '4em', marginRight: '4em'}}>
                <h3>
                    {colorText('red', '1.')} Teachers, sign up for a free account then create a list of classroom supplies including the number of each item needed.
                </h3>
                <h3>
                    {colorText('red', '2.')} Publish this list and receive a unique web link that you can share with students and community members.
                </h3>
                <h3>
                    {colorText('red', '3.')} Donors can view the list and select the supply item to donate. The supply list is updated automatically and donors receive an automated email notification.
                </h3>
                <h3>
                    {colorText('red', '4.')} Teachers can view the list of donors and committed supplies, sort the list, and download the list as a .csv file.
                </h3>               
            </div>

        );
    } else if (whichMsg === 'about') {
        return (
            <div>
                {aboutDeveloper('Alice')}
                {aboutDeveloper('Joel')}
                {aboutDeveloper('Sean')}
            </div>
        );
    }
}

function aboutDeveloper(name) {
    return (
        <div className="ui segment" style={{marginLeft: '20rem', marginRight:'20rem'}}>
            <h3 >About {name}</h3>
            <p style={{textAlign: 'left'}}>A little about me...</p>
        </div>
    );
}
function Message(props) {
  return (
    <div clasName='ui container'>
        {displayMsg(props.msg)}
    </div>
  );
};

export default Message;