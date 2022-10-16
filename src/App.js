import React from 'react';
import keepItSimple from './media/keepItSimple.png';
import aboutUs from './media/aboutUs.png';
import howItWorks from './media/howItWorks.png';
import './App.css';
import Banner from './Banner';
import ImageTitle from './ImageTitle';
import Message from './Message';
function App() {
  return (
    <div className="App" style={{ justifyContent: "space-between" }}>
        <Banner />
        <ImageTitle img={keepItSimple} />
        <Message msg='mission'/>
    </div>
  );
}

export default App;
