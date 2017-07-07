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
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";

import ListItem from "material-ui/List/ListItem";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import Badge from "material-ui/Badge";

import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import UserStore from "app/store/UserStore.js";
import { observer } from "mobx-react";
import { Scrollbars } from "react-custom-scrollbars";

import SearchInput, { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["email", "name", "nickname", "other_id_name"];

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

const header = {
  textAlign: "center"
};

let friendlist = [];
let friendlistcount;
const style = {
  margin: 12
};

@observer
export default class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      yay: true
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/api/user/friendlist"
    })
      .done(function(data) {
        friendlist = data;
        console.log("meri friendlist");
        console.log(data);
        friendlistcount = Object.keys(friendlist).length;
        FriendshipsStore.friendlistcount = friendlistcount;
        console.log(friendlistcount);
      })
      .fail(function(jqXhr) {
        console.log("friendlist mai msla");
      });
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  _handleClick(id) {
    console.log(id);
    alert(id);

    // var data = {
    //   user_id: realuserid,
    //   status: "pending",
    //   picture: user.picture,
    //   other_id_name: user.name,
    //   other_id: user.user_id
    // };
    // // Submit form via jQuery/AJAX
    // $.ajax({
    //   type: "POST",
    //   url: "/api/user/friendrequest",
    //   data: data
    // })
    //   .done(function(data) {
    //     console.log("POST req sent");
    //   })
    //   .fail(function(jqXhr) {
    //     console.log("failed to register POST REQ");
    //   });
  }

  render() {
    setTimeout(
      function() {
        this.setState({
          yay: false
        });
      }.bind(this),
      7000
    );

    const filteredEmails = friendlist.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <br />
          <div className="row">
            <div className="columns medium-8 large-8 small-centered">
              <div>
                <h3 style={header}>
                  Friendlist{" "}
                  <Badge
                    badgeContent={FriendshipsStore.friendlistcount}
                    primary={true}
                  />
                </h3>
              </div>
              <br />

              <SearchInput
                className="search-input"
                onChange={this.searchUpdated.bind(this)}
              />
              <br />

              <Scrollbars
                style={{ height: 300 }}
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
                {filteredEmails.map(Friendlist => {
                  var id;
                  if (Friendlist.user_id == UserStore.obj.user_id) {
                    id = Friendlist.other_id;

                    return (
                      <div className="mail">
                        <List key={Friendlist.user_id}>
                          <ListItem
                            key={Friendlist.user_id}
                            disabled={true}
                            leftAvatar={
                              <Avatar size={80} src={Friendlist.picture} />
                            }
                            rightIconButton={
                              <RaisedButton
                                label={"Remove Friend"}
                                primary={true}
                                onTouchTap={() => this._handleClick(id)}
                                style={style}
                              />
                            }
                          >
                            <div
                              className="searchContent"
                              key={Friendlist.other_id}
                            >
                              <div className="subject">
                                {Friendlist.other_id_name}
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
                        </List>
                      </div>
                    );
                  } else {
                    id = Friendlist.user_id;

                    return (
                      <div className="mail">
                        <List key={Friendlist.user_id}>
                          <ListItem
                            key={Friendlist.user_id}
                            disabled={true}
                            leftAvatar={
                              <Avatar size={80} src={Friendlist.user_picture} />
                            }
                            rightIconButton={
                              <RaisedButton
                                label={"Remove Friend"}
                                primary={true}
                                onTouchTap={() => this._handleClick(id)}
                                style={style}
                              />
                            }
                          >
                            <div
                              className="searchContent"
                              key={Friendlist.user_id}
                            >
                              <div className="subject">
                                {Friendlist.user_id_name}
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
                        </List>
                      </div>
                    );
                  }
                })}
              </Scrollbars>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
