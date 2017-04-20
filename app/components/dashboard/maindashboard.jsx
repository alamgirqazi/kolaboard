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

export default class MainDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toolbar />

          <RaisedButton label="Toggle Drawer" onTouchTap={this.handleToggle} />
          <Drawer open={this.state.open} containerStyle={{ height: "100%" }}>
            <AppBar
              title="Title"
              iconElementLeft={<IconButton onTouchTap={this.handleToggle} />}
            >
              <MenuItem>Menu Item</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </AppBar>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}
