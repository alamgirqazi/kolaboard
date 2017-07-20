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
import ContentAdd from "material-ui/svg-icons/image/navigate-next";
import ContentPlus from "material-ui/svg-icons/content/add-circle-outline";
import Snackbar from "material-ui/Snackbar";
import AlertContainer from "react-alert";

import ListItem from "material-ui/List/ListItem";
import TextField from "material-ui/TextField";

const KEYS_TO_FILTERS = ["user_id_name", "other_id_name"];
import FriendshipsStore from "app/store/FriendshipsStore.js";
const tableDisplay = {
  display: "table"
};
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
var socket;
@observer
export default class NewChatDrawer extends React.Component {
  constructor(props) {
    super(props);
    socket = io.connect();
    this.state = {
      open: false,
      snackbaropen: false,
      searchTerm: ""
    };
    this.logChange = this.logChange.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
  }
  alertOptions = {
    offset: 14,
    position: "bottom right",
    theme: "light",
    time: 2000,
    transition: "scale"
  };

  showAlert = () => {
    this.msg.show("Group Name field is empty", {
      time: 2000,
      type: "error"
    });
  };
  showSecondAlert = () => {
    this.msg.show("No User has been added", {
      time: 2000,
      type: "error"
    });
  };
  // handleToggle = () => this.setState({ open: !this.state.open });
  handleToggle = () => {
    UIStore.newchatdrawer = true;
  };
  handleCloseToggle = () => {
    UIStore.newchatdrawer = false;
    this.refs.groupname.getInputNode().value = "";
    mapping = [];
  };
  Next = () => {
    //error handling here
    if (this.refs.groupname.getInputNode().value == "" || mapping.length == 0) {
      // console.log("mapping at imp time");
      // console.log(mapping.length);
      {
        if (mapping.length == 0) this.showSecondAlert();
        else this.showAlert();
      }
    } else {
      var myinfo = {
        name: UserStore.userrealname,
        picture: UserStore.obj.picture,
        user_id: UserStore.obj.user_id
      };

      mapping.push(myinfo);
      // console.log("myinfo");
      // console.log(myinfo);

      var str = this.refs.groupname.getValue();
      var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
      var avatarletterlower = matches.join("");
      var avatarletter = avatarletterlower.toUpperCase();
      // console.log(avatarletter);
      // console.log("mapping.length" + mapping.length);
      var data = {
        id: UserStore.obj.user_id,
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

          // var newdata = UserStore.obj.user_id;
          // socket.emit("newdata", newdata);
          // socket.on("remaininggroups", function(data) {
          //   console.log("data[0].rooms");
          //   console.log(data[0].rooms);
          //   UserStore.obj.rooms = data[0].rooms;
          // });
          // socket.on("remainingchatlist", function(data) {
          //   // console.log("da");
          //   //console.log(data[0].rooms);

          //   UserStore.obj.rooms = data[0].rooms;
          // });
        })
        .fail(function(jqXhr) {
          // console.log("failed to register POST REQ");
        });
      this.setState({
        snackbaropen: true
      });

      setTimeout(
        function() {
          UIStore.newchatdrawer = false;
          mapping = [];
          ChatStore.chipContent = [];
          var newdata = UserStore.obj.user_id;
          socket.emit("newdata", newdata);
          socket.on("remaininggroups", function(data) {
            // console.log("data[0].rooms");
            // console.log(data[0].rooms);
            UserStore.obj.rooms = data[0].rooms;
          });
          socket.on("remainingchatlist", function(data) {
            UserStore.obj.rooms = data[0].rooms;
          });

          this.refs.groupname.getInputNode().value = "";
          this.setState({
            snackbaropen: false
          });
        }.bind(this),
        2000
      );
    }
  };

  handleRequestDelete = chipMap => {
    var index = mapping.findIndex(function(o) {
      return o._id === chipMap._id;
    });
    mapping.splice(index, 1);

    // UIStore.newchatdrawer = false;
  };
  handleClose = () => this.setState({ open: false });

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/api/user/friendlist"
    })
      .done(function(data) {
        FriendshipsStore.totalfriends = data;
        friendlist = FriendshipsStore.totalfriends;
      })
      .fail(function(jqXhr) {
        console.log("friendlist mai msla");
      });
  }

  _handleClick(Friendlist) {
    var val = [];
    let chip = {
      _id: Friendlist._id,
      name: Friendlist.userrealname,
      picture: Friendlist.userpicture,
      user_id: Friendlist.userid
    };
    ChatStore.chipContent.push(chip);

    ChatStore.chipContent = ChatStore.chipContent.reduce(function(field, e1) {
      var matches = field.filter(function(e2) {
        return e1._id == e2._id;
      });
      if (matches.length == 0) {
        field.push(e1);
      }
      return field;
    }, []);
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  logChange(val) {}

  render() {
    const filteredEmails = friendlist.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    mapping = ChatStore.chipContent;
    return (
      <div>
        <Drawer
          docked={true}
          width={400}
          style={topStyle}
          open={UIStore.newchatdrawer}
        >
          <AppBar
            title="Create Group"
            iconElementRight={
              <IconButton onTouchTap={this.handleCloseToggle}>
                <NavigationClose />
              </IconButton>
            }
          />
          <div>
            {mapping.map(chipMap => {
              return (
                <div key={chipMap._id}>
                  <Chip
                    key={chipMap._id}
                    onRequestDelete={this.handleRequestDelete.bind(
                      this,
                      chipMap
                    )}
                    style={styles.chip}
                  >
                    <Avatar key={chipMap._id} src={chipMap.picture} />
                    {chipMap.name}
                  </Chip>
                </div>
              );
            })};
          </div>
          <br />
          <TextField
            ref="groupname"
            hintText="Enter Group Name Here"
            floatingLabelText="Group Name"
            fullWidth={true}
          />{" "}
          <br />
          <br />
          <SearchInput
            ref="searchinput"
            className="search-input"
            placeholder="Search User"
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
            {filteredEmails.map(Friendlist => {
              var id;
              if (Friendlist.user_id == UserStore.obj.user_id) {
                id = Friendlist.other_id;

                Friendlist.userpicture = Friendlist.picture;

                // userpicture = Friendlist.picture;
                Friendlist.userrealname = Friendlist.other_id_name;
                Friendlist.userid = Friendlist.other_id;
                return (
                  <div className="mail">
                    <List key={Friendlist.other_id}>
                      <ListItem
                        key={Friendlist.other_id}
                        disabled={true}
                        leftAvatar={
                          <Avatar size={40} src={Friendlist.picture} />
                        }
                        rightIconButton={
                          <IconButton
                            tooltip="add"
                            touch={true}
                            primary={true}
                            onTouchTap={() => this._handleClick(Friendlist)}
                            tooltipPosition="bottom-center"
                          >
                            <ContentPlus />
                          </IconButton>
                        }
                      >
                        <div
                          className="searchContent"
                          key={Friendlist.other_id}
                        >
                          <div className="subject">
                            {Friendlist.other_id_name}
                          </div>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                );
              } else {
                id = Friendlist.user_id;
                Friendlist.userpicture = Friendlist.user_picture;
                Friendlist.userrealname = Friendlist.user_id_name;
                Friendlist.userid = Friendlist.user_id;

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
                          <IconButton
                            tooltip="add"
                            touch={true}
                            primary={true}
                            onTouchTap={() => this._handleClick(Friendlist)}
                            tooltipPosition="bottom-center"
                          >
                            <ContentPlus />
                          </IconButton>
                        }
                      >
                        <div className="searchContent" key={Friendlist.user_id}>
                          <div className="subject">
                            {Friendlist.user_id_name}
                          </div>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                );
              }
            })}
          </Scrollbars>
          <Snackbar
            open={this.state.snackbaropen}
            message="Group Created"
            autoHideDuration={2500}
            onRequestClose={this.handleRequestClose}
          />
          <div className="center-block" style={{ display: "table" }}>
            <RaisedButton
              className="center-block"
              label={"Create Group"}
              labelPosition="before"
              icon={<ContentAdd />}
              primary={true}
              style={tableDisplay}
              onTouchTap={() => this.Next()}
              style={style}
            />
          </div>
          <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        </Drawer>
      </div>
    );
  }
}
