import React from "react";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import {
  grey400,
  darkBlack,
  lightBlack,
  blue300
} from "material-ui/styles/colors";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import NavigationExpandMoreIcon
  from "material-ui/svg-icons/navigation/expand-more";
import MenuItem from "material-ui/MenuItem";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import FontIcon from "material-ui/FontIcon";
import Drawer from "app/components/drawer.jsx";
import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";

// const style = {
//   // backgroundColor: '#D0E9EA',
//    backgroundColor: '#dcf8c6',
// }

const bottomPadding = {
  paddingBottom: "12px"
};

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={darkBlack} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Settings</MenuItem>
    {/*<MenuItem></MenuItem>
    <MenuItem>Delete</MenuItem>*/}
  </IconMenu>
);

@observer
export default class Boardbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };

    this.handleFullscreen = this.handleFullscreen.bind(this);
  }
  handleFullscreen() {
    if (Store.full == "fullScreen") Store.full = "";
    else Store.full = "fullScreen";
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Noteboard" />
          <IconButton
            tooltip="expand"
            touch={true}
            tooltipPosition="bottom-center"
            onClick={this.handleFullscreen}
          >

     									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18"><path d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"/></svg>								

          </IconButton>
        </ToolbarGroup>

      </Toolbar>
    );
  }
}

// <svg

//   xmlns="http://www.w3.org/2000/svg"

//   width="24"

//   height="24"

//   viewBox="0 0 24 24"

// >

//   <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />

// </svg>
