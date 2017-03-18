import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerOpenRight from './drawer';

const style = {
 width: '100%',
  display:"block",
  margin:"2%",
};
    const modalstyle ={
      width:"75%",
      textAlign:"center",
      paddingLeft:"20%"
        }
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
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class LoginDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
     


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Log In" primary={true} onTouchTap={this.handleOpen} />
        <Dialog
          title="Log In"
          actions={actions}
          modal={false}
          autoDetectWindowHeight={true}
          style={modalstyle}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
         <div className="container-fluid">
              <button className="btn" style={stylegmail} >Log In with Google</button>
              <button className="btn" style={stylefacebook}>Log In with Facebook</button>
              <input placeholder="Email" style={style} className="emailpass"/>
              <input placeholder="Password" style={style}  className="emailpass"/>
              </div>
        </Dialog>
        </div>
    );
  }
}
