import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
var Infinite = require('react-infinite');
import { Scrollbars } from 'react-custom-scrollbars';
//import ReactScrollbar from 'react-scrollbar-js';

const style = {
  margin: 12,
};

export default class Chat extends React.Component {   

  render() {
    const styling = 
    {
width: '10px',
	backgroundColor: '#FFF',
    };
    
 const myScrollbar = {
      width: 400,
      height: 400,
    };
    return (

      <div classNameName="">
      {/*<Infinite containerHeight={500} elementHeight={4} displayBottomUpwards style={styling}> */}
      <Scrollbars style={{ height: 500 }} autoHeightMin={0}
        autoHeightMax={500}
        thumbMinSize={30}>
     <div className="panel">
                {/*<h4>Content goes here...</h4>
                <ul>
                    <li>1</li>
            
                </ul>*/}


                {/*<div className="menu">
            <div className="back"><i className="fa fa-chevron-left"></i> <img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
            <div className="name">Alex</div>
            <div className="last">18:09</div>
        </div>*/}
    <ol className="chat">
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p>Hola!</p>
        <p>Te vienes a cenar al centro? <emoji className="pizza"/></p>
        <time>20:17</time>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>Puff...</p>
        <p>Aún estoy haciendo el contexto de Góngora... <emoji className="books"/></p>
        <p>Mejor otro día asd asj asd d asd asd asd asd asd asd asd asd asd</p>
        <time>20:18</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p>Qué contexto de Góngora? <emoji className="suffocated"/></p>
        <time>20:18</time>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>El que mandó Marialu</p>
        <p>Es para mañana...</p>
        <time>20:18</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p><emoji className="scream"/></p>
        <p>Pásamelo! <emoji className="please"/></p>
        <time>20:18</time>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <img src="http://i.imgur.com/QAROObc.jpg" draggable="false"/>
        <time>20:19</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p>Gracias! <emoji className="hearth_blue"/></p>
        <time>20:20</time>
      </div>
    </li>
        <div className="day">Hoy</div>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>Te apetece jugar a Minecraft? asdkahsdkjashdjasdhkajsdhakjsdhkajsdh asdkjhasd asdjha sdkj askdjh asd</p>
        <time>18:03</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p>Venga va, hace ya mucho que no juego...</p>
        <time>18:07</time>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>Ehh, me crashea el Launcher... <emoji className="cryalot"/></p>
        <time>18:08</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p><emoji className="lmao"/></p>
        <time>18:08</time>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>Es broma</p>
        <p>Ataque Moai!</p>
        <p><span><emoji className="moai"/></span><span><emoji className="moai"/></span><span><emoji className="moai"/></span><span><emoji className="moai"/></span><span><emoji className="moai"/></span><span><emoji className="moai"/></span></p>
        <time>18:09</time>
      </div>
    </li>
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
          <p>Copón</p>
        <p><emoji className="funny"/></p>
        <time>18:08</time>
      </div>
    </li>
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p>Hey there's a new update about this chat UI with more responsive elements! Check it now:</p>
        <p><a href="http://codepen.io/Varo/pen/YPmwpQ" target="parent">Chat UI 2.0</a></p>
        <time>18:09</time>
      </div>
    </li>
    </ol>
    {/*<input className="textarea" type="text" placeholder="Type here!"/><div className="emojis"></div>*/}

            </div>
</Scrollbars>
 {/*</Infinite> */}


      </div>
    );
  }
}
