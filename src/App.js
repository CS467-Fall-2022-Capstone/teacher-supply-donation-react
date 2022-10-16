import React from 'react';
import keepItSimple from './media/keepItSimple.png';
import aboutUs from './media/aboutUs.png';
import howItWorks from './media/howItWorks.png';
import './App.css';
import Banner from './Banner';
import ImageTitle from './ImageTitle';
import Message from './Message';

// assign ImageTitle img={aboutUs} or img={howItWorks} to see other ImageTitles
// assign msg='about' or msg='how-it-works' to see other Messages
function App() {
  return (
    <div className="App" style={{ justifyContent: "space-between" }}>
        <Banner />
        <ImageTitle img={aboutUs} /> 
        <Message msg='about'/>
    </div>
  );
}

export default App;
