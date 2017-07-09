import React from "react";
import { AppBar, Drawer } from "material-ui";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import UIStore from "app/store/UIstore.js";
import { observer } from "mobx-react";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import { Scrollbars } from "react-custom-scrollbars";
import UserStore from "app/store/UserStore.js";
import ChatStore from "app/store/ChatStore.js";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import SearchInput, { createFilter } from "react-search-input";
import List from "material-ui/List/List";

import ListItem from "material-ui/List/ListItem";
import TextField from "material-ui/TextField";

const KEYS_TO_FILTERS = ["email", "name", "nickname", "user_id"];
import FriendshipsStore from "app/store/FriendshipsStore.js";
var Select = require("react-select");

const topStyle = {
  top: "60px"
};

let friendlist = [];
// let friendlistcount;
let userrealname;
let userpicture;
let userid;
let mapping = [];
const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};
const style = {
  margin: 12
};

var options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two", clearableValue: false }
];
@observer
export default class NewChatDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTerm: ""
    };
    this.logChange = this.logChange.bind(this);
  }

  // handleToggle = () => this.setState({ open: !this.state.open });
  handleToggle = () => {
    UIStore.newchatdrawer = true;
  };
  handleCloseToggle = () => {
    UIStore.newchatdrawer = false;
  };
  Next = () => {
    alert("next");

    var myinfo = {
      name: UserStore.userrealname,
      picture: UserStore.obj.picture,
      user_id: UserStore.obj.user_id
    };
    mapping.push(myinfo);
    console.log("myinfo");
    console.log(myinfo);

    var str = this.refs.groupname.getValue();
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    var avatarletter = matches.join("");
    console.log(avatarletter);
    console.log("mapping.length" + mapping.length);
    var data = {
      groupname: this.refs.groupname.getValue(),
      avatarletter: avatarletter,
      mapping: JSON.stringify(mapping)
    };

    $.ajax({
      type: "POST",
      url: "/api/createGroup",
      data: data
    })
      .done(function(data) {
        alert("its all over");
      })
      .fail(function(jqXhr) {
        // console.log("failed to register POST REQ");
      });
  };
  handleRequestDelete = chipMap => {
    // alert("a");
    // UIStore.newchatdrawer = false;
  };
  handleTouchTap = () => {
    // UIStore.newchatdrawer = false;
  };

  handleClose = () => this.setState({ open: false });
  // Map Friendlist

  // Set Group Name
  // createChip() {
  //   return (
  //     // <Chip style={styles.chip}>
  //     //   <Avatar src="images/ok-128.jpg" />
  //     //   Deletable Avatar Chip
  //     // </Chip>
  //   );
  // }
  componentDidMount() {
    // ChatStore.chipContent.push(myinfo);

    $.ajax({
      type: "GET",
      url: "/api/user/friendlist"
    })
      .done(function(data) {
        // friendlist = data;
        // friendlistcount=Object.keys(friendlist).length;
        FriendshipsStore.totalfriends = data;
        friendlist = FriendshipsStore.totalfriends;

        // console.log(friendlistcount);
      })
      .fail(function(jqXhr) {
        console.log("friendlist mai msla");
      });
  }
  _handleClick(Friendlist) {
    // alert(Friendlist._id);
    let chip = {
      _id: Friendlist._id,
      name: userrealname,
      picture: userpicture,
      user_id: userid
    };

    ChatStore.chipContent.push(chip);

    // mapping = ChatStore.chipContent;
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
  }

  render() {
    const filteredEmails = friendlist.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    mapping = ChatStore.chipContent;
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

          <SearchInput
            className="search-input"
            onChange={this.searchUpdated.bind(this)}
          />

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
            <div>
              {mapping.map(chipMap => {
                return (
                  <div>
                    <Chip
                      onRequestDelete={this.handleRequestDelete(chipMap)}
                      style={styles.chip}
                    >
                      <Avatar src={chipMap.picture} />
                      {chipMap.name}
                    </Chip>
                  </div>
                );
              })};
            </div>
            <TextField
              ref="groupname"
              floatingLabelFixed={true}
              fullWidth={true}
            />{" "}
            <br />
            <RaisedButton
              label={"Next"}
              primary={true}
              onTouchTap={() => this.Next()}
              style={style}
            />
            {filteredEmails.map(Friendlist => {
              var id;
              if (Friendlist.user_id == UserStore.obj.user_id) {
                id = Friendlist.other_id;

                userpicture = Friendlist.picture;
                userrealname = Friendlist.other_id_name;
                userid = Friendlist.other_id;
                return (
                  <div className="mail">
                    <List key={Friendlist.user_id}>
                      <ListItem
                        key={Friendlist.user_id}
                        disabled={true}
                        leftAvatar={
                          <Avatar size={40} src={Friendlist.picture} />
                        }
                        rightIconButton={
                          <RaisedButton
                            label={"Add"}
                            primary={true}
                            onTouchTap={() => this._handleClick(Friendlist)}
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
                userpicture = Friendlist.user_picture;
                userrealname = Friendlist.user_id_name;
                userid = Friendlist.user_id;

                return (
                  <div className="mail">
                    <List key={Friendlist.user_id}>
                      <ListItem
                        key={Friendlist.user_id}
                        disabled={true}
                        leftAvatar={
                          <Avatar size={40} src={Friendlist.user_picture} />
                        }
                        rightIconButton={
                          <RaisedButton
                            label={"Add"}
                            primary={true}
                            onTouchTap={() => this._handleClick(id)}
                            style={style}
                          />
                        }
                      >
                        <div className="searchContent" key={Friendlist.user_id}>
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
        </Drawer>
      </div>
    );
  }
}
