import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
// import RaisedButton from "material-ui/RaisedButton";
// import muiThemeable from "material-ui/styles/muiThemeable";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {AppBar, Drawer} from 'material-ui';


export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
         return(
           
            <div>
            <Toolbar></Toolbar>
   <Drawer open={this.state.open} containerStyle={{ height: "100%" }}>
            <AppBar
              title="kolaboard"
              iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
            >
             </AppBar>
              <MenuItem checked={true}><Link to="/app">App</Link></MenuItem>
              <MenuItem ><Link to="/events">Events</Link></MenuItem>
              <MenuItem><Link to="/timetable">Time Table</Link></MenuItem>
          </Drawer>

        </div> 
         );
  }
}

