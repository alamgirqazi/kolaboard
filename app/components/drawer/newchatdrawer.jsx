import React from "react";
import { AppBar, Drawer } from "material-ui";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import UIStore from "app/store/UIstore.js";
import { observer } from "mobx-react";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";

const topStyle = {
  top: "60px"
};

@observer
export default class NewChatDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  // handleToggle = () => this.setState({ open: !this.state.open });
  handleToggle = () => {
    UIStore.newchatdrawer = true;
  };
  handleCloseToggle = () => {
    UIStore.newchatdrawer = false;
  };

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Drawer
          docked={true}
          width={350}
          style={topStyle}
          open={UIStore.newchatdrawer}
        >
          <AppBar
            title=""
            iconElementRight={
              <IconButton onTouchTap={this.handleCloseToggle}>
                <NavigationClose />
              </IconButton>
            }
          />
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
// <RaisedButton label="Open Drawer" onTouchTap={this.handleToggle} />
