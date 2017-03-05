import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
var Infinite = require('react-infinite');
import Toolbar from 'Toolbar';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from 'material-ui/Avatar';

import Chatbar from 'app/components/toolbars/chattoolbar.jsx';
//import ReactScrollbar from 'react-scrollbar-js';

const style = {
  margin: 12,
};

const heightchat
={
height: '100%',
backgroundColor: '#EDF8F5',
}

export default class Chat extends React.Component {   

  render() {

    
 const myScrollbar = {
      width: 400,
      height: 400,
    };

const toolbarstyle = 
{
top: '0px',
position: 'fixed',

};


    return (

      <div className="" style={heightchat}>
<Chatbar style={toolbarstyle}/>
      {/*<Infinite containerHeight={500} elementHeight={4} displayBottomUpwards style={styling}> */}
      <Scrollbars style={{ height: '100%' }} autoHeightMin={0}
        autoHeightMax={500}
        thumbMinSize={30}>

     <div className="panel">
           
    <ol className="chat">
    <li className="other">
        {/*<div className="avatar">
          
          <Avatar src="http://lorempixel.com/g/400/200" />
          </div>*/}
      
      
      <div className="msg">
        <p>Seen Westworld?</p>
        <p>So in the finale we see Dolores</p>
        <p>
           and Teddy beat up man in black- William.  {/*<emoji className="pizza"/>*/}
 </p>
        <time>20:17</time>
        <sender>Usama</sender>
      </div>
    </li>
    <li className="self">
        {/*<div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>*/}
      <div className="msg">
        <p>But first he stabs Dolores.</p>
  
        <time>20:18</time>
      </div>
    </li>

    <li className="self">
        {/*<div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>*/}
      <div className="msg">
        <p> This causes Dolores and Teddy to run away.</p>
        <time>20:19</time>
      </div>
    </li>


    <li className="other">
        {/*<div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>*/}
      <div className="msg">
        <p>and end up on the beach </p>
        <time>20:18</time>
        <sender>Danish</sender>
      </div>
    </li>
    <li className="self">
        {/*<div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>*/}
      <div className="msg">
        <p> where Ford shows everyone his ending </p>
        <p>after Teddy's speech to Dolores.</p>
        <time>20:18</time>
      </div>
    </li>
    <li className="other">
        {/*<div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>*/}
      <div className="msg">
        <p><emoji className="scream"/></p>
        <p>Damn!!!</p>
        <time>20:18</time>
        <sender>awais</sender>
      </div>
    </li>
    <li className="self">
        {/*<div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>*/}
      <div className="msg">
    <p>Was Dolores getting stabbed by William part of Ford's plan?</p>    
        <time>20:19</time>
      </div>
    </li>
    <li className="other">
        {/*<div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>*/}
      <div className="msg">
        <p>YESSSSSS.  <emoji className="hearth_blue"/></p>
        <time>20:20</time>
        <sender>muneeb</sender>
      </div>
    </li>
        {/*<div className="day">Hoy</div>*/}
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
<p>
  If he hadn't how would Dolores and Teddy 
 </p>
 <p>ended up at the beach with Teddy's monologue speech?</p>
  
          <time>18:03</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p>Everyone gets stabbed all the time</p>
        <time>18:07</time>
        <sender>usama</sender>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>it really had to be dolores in that final scene.<emoji className="cryalot"/></p>
        <time>18:08</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p> how much time did they have?
<emoji className="lmao"/></p>
        <time>18:08</time>
        <sender>zunnurain</sender>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>not nearly enough time.</p>
        <time>18:09</time>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>It is called "Host Intake Protocol"
</p>
        <time>18:12</time>
        <sender>danish</sender>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
          <p>Seriously?</p>
        <p><emoji className="funny"/></p>
        <time>18:08</time>
        <sender>awais</sender>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>Ford manages to turn teddy around</p>
        <time>18:09</time>
      </div>
    </li>
    </ol>
   
            </div>
</Scrollbars>
  {/*<input className="textarea" type="text" placeholder="Type here!"/><div className="emojis"></div>*/}

 {/*</Infinite> */}


      </div>
    );
  }
}
