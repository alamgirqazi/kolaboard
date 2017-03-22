import React from 'react';
var {Link, IndexLink} = require("react-router");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LoginDialog from 'app/components/loginmodal.jsx';
import SignupDialog from 'app/components/signupmodal.jsx';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Scrollbars } from 'react-custom-scrollbars';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

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
           <SignupDialog/>
       ); 
    }
render()
{
 

return (
 <MuiThemeProvider>
<div>
<div className="firstPage">
    <h2 style={style}> A Collaboration app <strong className="element typewriteColor" ></strong></h2>
<br/>
<br/>
<p style={aligncenter}>Kolaboard lets you organize and prioritize your tasks <br/> making collaboration easier and more fun.</p>
<br/>
  <SignupDialog title="Sign Up! It's free"/>
<br/>
<br/>
</div>

<p style={aligncenter}>Already using kolaboard? <a>Login</a>
 </p>
      {/*{" "}
            <IndexLink
              to="/"
              activeClassName="active"
              activeStyle={{
              fontWeight: "bold"
            }}>
              Login
            </IndexLink>*/}


<div className="secondPage">
<p>What are you waiting for?</p>
<br/>
<br/>
<p>Sign Up for free and enjoy all the exclusive features<br/>of kolaboard</p>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
</div>
</div>
</MuiThemeProvider>
 )
  
};
}
