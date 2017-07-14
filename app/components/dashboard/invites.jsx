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
import { lightBlue500, blue500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import { Tabs, Tab } from "material-ui/Tabs";
import FontIcon from "material-ui/FontIcon";
import MapsPersonPin from "material-ui/svg-icons/maps/person-pin";
import FindFriends from "app/components/dashboard/FindFriends.jsx";
import AcceptRequests from "app/components/dashboard/AcceptRequests.jsx";
import FriendList from "app/components/dashboard/FriendList.jsx";
import UserStore from "app/store/UserStore.js";
import Badge from "material-ui/Badge";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import { observer } from "mobx-react";
import UIStore from "app/store/UIstore.js";
const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400,
    primary2Color: lightBlue500,
    secondary1Color: lightBlue500,
    //  primary3Color:greenA400,
    accent1Color: blue500
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
@observer
export default class Invites extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClick = () => {
    if (UIStore.tabChange == true) {
      UIStore.tabChange = false;
    } else UIStore.tabChange = true;
  };

  componentDidMount() {
    var data = { id: UserStore.obj.user_id };
    // console.log("userstore.obj.user_id" + data);
    $.ajax({
      type: "POST",
      url: "/api/user/myuserid",
      data: data
    })
      .done(function(data) {
        // console.log("done my user id" + data);
      })
      .fail(function(jqXhr) {
        console.log("failed to register");
      });
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Toolbar />

          <Tabs onChange={() => this._handleClick()}>
            <Tab
              icon={
                <FontIcon className="material-icons">Find Friends </FontIcon>
              }
              label="."
            >
              <FindFriends />
            </Tab>
            <Tab
              icon={
                <FontIcon className="material-icons">
                  {" "}Accept / Reject Requests<Badge
                    badgeContent={FriendshipsStore.acceptrequestscount}
                    secondary={true}
                  />
                </FontIcon>
              }
              label="accept"
            >
              <AcceptRequests />
            </Tab>
            <Tab
              icon={
                <FontIcon className="material-icons">
                  {" "}Friend List<Badge
                    badgeContent={FriendshipsStore.friendlistcount}
                    secondary={true}
                  />
                </FontIcon>
              }
              label="."
            >
              <FriendList />
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}
