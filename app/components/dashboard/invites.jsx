import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import muiThemeable from "material-ui/styles/muiThemeable";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import FindFriends from 'app/components/dashboard/FindFriends.jsx';
import AcceptRequests from 'app/components/dashboard/AcceptRequests.jsx';
const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400
    //  primary3Color:greenA400,
    //   accent1Color: greenA400,
    //   accent2Color: greenA400,
    //   accent3Color: greenA400

    //this is for changing the theme
  },
  toggle: {
    thumbOnColor: "yellow",
    trackOnColor: "red",
    backgroundColor: "red"
  },
  appBar: {
    height: 50
  }
});
export default class Invites extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
         return(
           <MuiThemeProvider muiTheme={muiTheme}>
            <div>
 <Toolbar />

 <Tabs>
    <Tab
      icon={<FontIcon className="material-icons">Find Friends</FontIcon>}
    label="."
    >

    <FindFriends/>
    
    </Tab>
    <Tab
      icon={<FontIcon className="material-icons"> Accept / Reject Requests</FontIcon> }
       label="accept"

    >

    <AcceptRequests/>

    </Tab>
  
  </Tabs>
        </div> 
        </MuiThemeProvider>
);
  }
}
