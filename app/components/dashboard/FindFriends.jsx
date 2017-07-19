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
import Avatar from "material-ui/Avatar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import { Scrollbars } from "react-custom-scrollbars";
import FriendshipStore from "app/store/FriendshipsStore.js";
import Badge from "material-ui/Badge";
import NotificationsIcon from "material-ui/svg-icons/action/check-circle";

// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import SearchInput, { createFilter } from "react-search-input";
import FontIcon from "material-ui/FontIcon";
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import UserStore from "app/store/UserStore.js";

// const KEYS_TO_FILTERS = ["user.name", "subject", "dest.name"];
const KEYS_TO_FILTERS = ["email", "name", "nickname", "user_id"];

const style = {
  margin: 12
};
const header = {
  textAlign: "center"
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

let users = [];
@observer
export default class FindFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ""
    };

    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    let userid = localStorage.getItem("userid");

    $.ajax({
      type: "GET",
      url: "/api/userall"
    })
      .done(function(data) {
        // console.log(data)
        users = data;
        var index = users.findIndex(function(o) {
          return o.user_id === userid;
        });
        users.splice(index, 1);
        UserStore.allUsers = users;

        UserStore.allUsers.forEach(function(user_id) {
          for (var i = 0; i < 2; i++) {
            if (
              user_id.user_id == FriendshipStore.myfriendslist[i].other_id ||
              user_id.user_id == FriendshipStore.myfriendslist[i].user_id
            ) {
              UserStore.allUsers[i].nickname = "yay";
              //      console.log(users.yes);
            } else {
            }
          }
          // var x = arrayItem.prop1 + 2;
          // alert(x);
        });

        UserStore.flisty = true;
      })
      .fail(function(jqXhr) {
        console.log("failed to register findfriends");
      });
  }
  _handleRemove(user) {
    alert(user.user_id);
  }

  _handleClick(user) {
    let realuserid = localStorage.getItem("userid");

    // console.log(user.name);
    // console.log(user.picture);

    var data = {
      user_id: realuserid,
      status: "pending",
      picture: user.picture,
      user_picture: UserStore.obj.picture,
      other_id_name: user.name,
      user_id_name: UserStore.userrealname,
      other_id: user.user_id
    };
    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "/api/user/friendrequest",
      data: data
    })
      .done(function(data) {
        console.log("POST req sent");
      })
      .fail(function(jqXhr) {
        console.log("failed to register POST REQ");
      });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  render() {
    const filteredEmails = UserStore.allUsers.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div className="row">
            <div className="columns medium-8 large-8 small-centered">
              <br />
              <h3 style={header}>Find Friends</h3>
              <br />

              <div>
                <SearchInput
                  className="search-input"
                  onChange={this.searchUpdated.bind(this)}
                />
                <br />

                <Scrollbars
                  style={{ height: 350 }}
                  renderTrackHorizontal={props =>
                    <div
                      {...props}
                      className="track-horizontal"
                      style={{ display: "none" }}
                    />}
                  renderThumbHorizontal={props =>
                    <div
                      {...props}
                      className="thumb-horizontal"
                      style={{ display: "none" }}
                    />}
                >
                  {filteredEmails.map(user => {
                    if (user.nickname == "yay") {
                      return (
                        <List key={user.user_id}>
                          <div className="mail" key={user.user_id}>
                            <ListItem
                              key={user.user_id}
                              disabled={true}
                              leftAvatar={
                                <Avatar size={80} src={user.picture}>
                                  <Badge
                                    badgeContent={<NotificationsIcon />}
                                    primary={true}
                                  />
                                </Avatar>
                              }
                              rightIconButton={
                                <RaisedButton
                                  label={"Remove Friend"}
                                  key={user.user_id}
                                  onTouchTap={() => this._handleRemove(user)}
                                  style={style}
                                />
                              }
                              // rightIconButton={<RaisedButton label="Send Request" primary={true} onClick={this.btnClick(user)} style={style} />
                              // }
                            >
                              <div className="searchContent" key={user.user_id}>
                                <div className="subject">
                                  {user.name}
                                </div>
                                <br />
                                <div className="from">
                                  {}
                                </div>
                                <br />
                                <div className="subject">
                                  {}
                                </div>
                              </div>
                            </ListItem>
                          </div>
                        </List>
                      );
                    } else {
                      return (
                        <List key={user.user_id}>
                          <div className="mail" key={user.user_id}>
                            <ListItem
                              key={user.user_id}
                              disabled={true}
                              leftAvatar={
                                <Avatar size={80} src={user.picture} />
                              }
                              rightIconButton={
                                <RaisedButton
                                  label={"Add Friend"}
                                  primary={true}
                                  key={user.user_id}
                                  onTouchTap={() => this._handleClick(user)}
                                  style={style}
                                />
                              }
                              // rightIconButton={<RaisedButton label="Send Request" primary={true} onClick={this.btnClick(user)} style={style} />
                              // }
                            >
                              <div className="searchContent" key={user.user_id}>
                                <div className="subject">
                                  {user.name}
                                </div>
                                <br />
                                <div className="from">
                                  {}
                                </div>
                                <br />
                                <div className="subject">
                                  {}
                                </div>
                              </div>
                            </ListItem>
                          </div>
                        </List>
                      );
                    }
                  })}
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
// <button>{email.name}</button>
// <div className="from">
//                               {user.email}
//                             </div>
//                             <br />
//                             <div className="subject">
//                               {user.identities[0].provider}
//                             </div>
