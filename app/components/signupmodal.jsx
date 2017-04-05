import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


const modalstyle ={
      width:"75%",
      textAlign:"center",
      paddingLeft:"20%"
        }
        const style = {
 width: '100%',
  display:"block",
  margin:"2%",
};
const stylefacebook = {
   width: '100%',
  display:"block",
  margin:"2%",
backgroundColor:"#5499C7",
color:"white"
};
const stylegmail = {
   width: '100%',
  display:"block",
  margin:"2%",
backgroundColor:"#E74C3C",
color:"white"
};

const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400
    //  primary3Color:greenA400,
    //   accent1Color: greenA400,
    //   accent2Color: greenA400,
    //   accent3Color: greenA400

    //this is for changing the theme
  }
});


export default class SignupDialog extends React.Component {
  
  
  state = {
    open: false,
  };

  handleOpen = () => {
    //  this.setState({open: true});
// e.preventDefault();
        this.props.lock.show();

  };

  handleClose = () => {
    this.setState({open: false});
  };
     


  render() {

    
    const actions = [
      /*<FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,*/
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />,
    ];

    const sty =
    {
      margin: 12,    
    }

    return (
          <MuiThemeProvider muiTheme={muiTheme}>

      <div>
        <RaisedButton label={this.props.title} style={sty} primary={true}   onTouchTap={this.handleOpen} />       
      </div>
</MuiThemeProvider>
// labelColor="white" backgroundColor="#00E676"
    );
  }
}



//         {/*<Dialog
//           title="Sign Up"
//           actions={actions}
//           modal={false}
//           autoDetectWindowHeight={true}
//           open={this.state.open}
//           style={modalstyle}
//           onRequestClose={this.handleClose}
//         >
        
// <div className="container-fluid">
//               <button className="btn" style={stylegmail} >{/*<img height="1px" src="gmaillogo.png"/>*/}Log In with Google</button>
//         //       <button className="btn" style={stylefacebook}>{/*<img height="1px" src="facebooklogo.png"/>*/}Log In with Facebook</button>
//         //       <input placeholder="Email" style={style} className="emailpass"/>
//         //       <input placeholder="Password" style={style}  className="emailpass"/>
//         //       </div>             
//         // </Dialog>*/}