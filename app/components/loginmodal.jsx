import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerOpenRight from './drawer';

import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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

// var options = {
//       languageDictionary: {
//         emailInputPlaceholder: "something@youremail.com",
//         title: "Log In"
//       },
//         allowSignUp: false,

//       // allowLogin: false,

//       theme: {
//         logo: "http://icons.iconarchive.com/icons/custom-icon-design/flatastic-11/48/Customer-service-icon.png",
//         primaryColor: "#00E676"
//       }
//     };



const muiTheme = getMuiTheme({
  palette: {

  }
});

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class LoginDialog extends React.Component {

  constructor(props)
  {
    super(props);
    
  }
  state = {
    open: false,
  };

  handleOpen = () => {

        this.props.lock.show();

  };  


  render() {

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
 