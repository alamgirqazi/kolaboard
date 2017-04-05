import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
      <div>
        <RaisedButton label={this.props.title} style={sty}  labelColor="white" backgroundColor="#00E676" onTouchTap={this.handleOpen} />       
      </div>
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