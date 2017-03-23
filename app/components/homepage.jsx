import React from 'react';
var {Link, IndexLink} = require("react-router");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LoginDialog from 'app/components/loginmodal.jsx';
import SignupDialog from 'app/components/signupmodal.jsx';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Scrollbars } from 'react-custom-scrollbars';
var Infinite = require('react-infinite');


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const styleimg = {
    width:"30%" ,
    height:"30%"
}
const scrollx = {

overflowX: 'hidden',

}
const style = {
textAlign: 'center',
    letterSpacing: '2px',

}

const aligncenter = 
{
    textAlign: 'center',
    fontSize: '18px',
    wordSpacing: '0.5px',

}

export default class Homepage extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
 }

  componentDidMount () {
          this.myFunc();

  }
   myFunc()   {
        document.addEventListener("DOMContentLoaded", function() {
            Typed.new(".element", {
                strings: ["<em> for teams.</em>", " <em>for students.</em>", "<em> for developers. </em>"],
                typeSpeed: 30, // typing speed
                loop: !0, // here
                backSpeed: 20,
                startDelay: 60,
                backDelay: 1200,
                showCursor: true

            });
        });
    }
    openLogin(){
       return(
           <LoginDialog/>
       ); 
    }
       openSignUp(){
       return(
           <SignupDialog title="Sign Up! it's free"/>
       ); 
    }
render()
{
 

return (
     <MuiThemeProvider>
    <div style={scrollx}>
     {/*<Scrollbars style={{  }}>*/}

<div>
       
<div className="firstPage">
    <h2 style={style}> A Collaboration app <strong className="element typewriteColor" ></strong></h2>
<br/>
<br/>
<p style={aligncenter}>Kolaboard lets you organize and prioritize your tasks <br/> making collaboration easier and more fun.</p>
<br/>
  <SignupDialog title="Sign Up now! It's free"/>
<br/>
<br/>
</div>
<p style={aligncenter}>Already using kolaboard? <a>Login</a>
 </p>
</div>
<div className="secondPage">
<h2 style={style}>What are you waiting for?</h2>
<br/>
<br/>
<p style={aligncenter }>Sign Up for free and enjoy all the exclusive features<br/>of kolaboard</p>
<br/>
  <SignupDialog title="Sign Up now! It's free"/>
<br/>
<br/>
<p style={aligncenter}>Already using kolaboard? <a>Login</a>
 </p>
 <br/>
 <br/>
            <div>
            <a>&nbsp; Tour &nbsp;</a>
             <a>&nbsp; Blog &nbsp;</a>  
            <a>&nbsp; About &nbsp;</a>
            <a>&nbsp; Help &nbsp;</a>
            </div>
            <br/>
            <p>&copy; copyright 2017 Kolaboard</p>
</div>
<div className="thirdPage">
<h2 style={style}>Another heading probably?</h2>
<p style={aligncenter}>Easier to communicate and collaborate<br/>with noteboards</p>
<br/>
<br/>
<img src="noticeboard.jpg" alt="Mountain View" style={styleimg}/>
<br/>
<br/>
</div>
<div className="fourthPage">
<h1>How it works?</h1>
<br/>
<p style={aligncenter}>Watch the simple one minute explainer for<br/> kolaboard </p>
<br/>
<video width="450" controls>
  <source src="test.mp4" type="video/mp4"/>
</video>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
  {/*</Scrollbars>*/}
</div>
</MuiThemeProvider>
 )
  
};
}
