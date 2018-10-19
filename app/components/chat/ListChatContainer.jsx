
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import FriendshipStore from "app/store/FriendshipsStore.js";
import React, { Component } from "react";
import PropTypes from "prop-types";
import MobileTearSheet from "app/api/MobileTearSheet.js";
import Badge from "material-ui/Badge";
import { List, ListItem, makeSelectable } from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import {
  grey400,
  darkBlack
} from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import { Scrollbars } from "react-custom-scrollbars";
import Msgbar from "app/components/toolbars/msgtoolbar.jsx";
import { observer } from "mobx-react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { red500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
import UserStore from "app/store/UserStore.js";
import ChatStore from "app/store/ChatStore.js";
import Dialog from "material-ui/Dialog";
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: greenA400,
    accent1Color: red500
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
let rooms = [];
let SelectableList = makeSelectable(List);
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const stylebtn = {
  margin: 12
};
const style = {
  height: "100%"
};
var listmap;
let users = [];
let realusers = [];

@observer
export default class ListChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this.state = {
      data: [],
      openDelete: false,
      openleavesnack: false
    };
  }

  _handleLeave(Users) {
    this.setState({
      openDelete: true
    });
    var data = {
      user_id: UserStore.obj.user_id,
      roomId: Users._id
    };
    ChatStore.leaveinfo = data;
    ChatStore.leavegroupname = Users.roomName;
  }
  _handleClick(Users) {
    ChatStore.btnClick = true;
    ChatStore.groupId = Users.roomId;
    ChatStore.groupname = Users.roomName;
    ChatStore.groupavatar = Users.pic;
    ChatStore.totalmsgscount = Users.total_count;
    ChatStore.totalnotescount = Users.total_notes_count;
    var roomId = ChatStore.groupId;

    socket.emit("Join room", ChatStore.groupname);
    var location = "/api/rooms/" + roomId;

    socket.emit("note map", roomId);

    socket.on("recieving listchat rooms", function(data) {
      ChatStore.participants = data[0].participants;
      ChatStore.remainparticipants = data[0].remainparticipants;
      var remain = ChatStore.remainparticipants;
      var mappedlength = FriendshipStore.mappedFriends.length;

      socket.emit("read sync", UserStore.obj.user_id);

      socket.on("sync success", function(data) {
        UserStore.obj.rooms = data[0].rooms;
      });

      remain.forEach(function(a) {
        for (var i = 0; i < mappedlength; i++) {
          if (a.user_id == FriendshipStore.mappedFriends[i].user_id) {
            FriendshipStore.mappedFriends[i].present = true;
          }
        }
      });

      ChatStore.readcount = Object.keys(data[0].conversation).length;
      ChatStore.notescount = Object.keys(data[0].notes).length;
      ChatStore.admin_id = data[0].admin_id;
      ChatStore.created_on = data[0].created_on;

      var data = {
        user_id: UserStore.obj.user_id,
        _id: Users._id,
        count: ChatStore.readcount.toString(),
        notescount: ChatStore.notescount.toString()
      };

      socket.emit("readcountmsg", data);
    });
  }
  componentDidMount() {
    socket.on("msgs", function(data) {
      ChatStore.msgs = data.msg;
    });
    socket.on("dbnotes", function(data) {
      ChatStore.notes = data.dbnotes;
    });
  }
  handleLeaveDialog = () => {
    var data = ChatStore.leaveinfo;
    socket.emit("room leave", ChatStore.leaveinfo);
    socket.on("remaininggroups", function(data) {
      UserStore.obj.rooms = data[0].rooms;
    });

    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    //console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var date = mm + "/" + dd + "/" + yyyy;
    var data1 = {
      from: UserStore.userrealname,
      message: "HAS LEFT THE GROUP",
      date: date,
      time: time,
      roomId: ChatStore.groupId,
      user_name: UserStore.userrealname,
      user_id: UserStore.obj.user_id
    };
    socket.emit("manipulate group", data1);
    this.setState({
      openDelete: false,
      openleavesnack: true
    });

    setTimeout(
      function() {
        this.setState({
          openleavesnack: false
        });
      }.bind(this),
      1500
    ); //
  };

  handleDeleteClose = () => {
    this.setState({ openDelete: false });
  };

  render() {
    const actionsDelete = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleDeleteClose}
        style={stylebtn}
      />,
      <RaisedButton
        secondary={true}
        label="Leave the Group"
        onTouchTap={this.handleLeaveDialog}
      />
    ];
    const iconButtonElement = (
      <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const liststatus = UserStore.listy;
    if (UserStore.obj.rooms == null || UserStore.obj.rooms == undefined)
      rooms = [];
    else rooms = UserStore.obj.rooms;

    return (
      <MobileTearSheet muiTheme={muiTheme}>
        <div>
          <div className="margin" style={style}>
            <Msgbar />
            <Subheader>Today</Subheader>
            <Snackbar
              open={this.state.openleavesnack}
              message={
                "You have left the " + ChatStore.leavegroupname + " group"
              }
              autoHideDuration={1500}
            />
            <Scrollbars
              autoHeightMin={0}
              style={{ height: "100vh" }}
              autoHeightMax={50}
              thumbMinSize={50}
            >
              {rooms.map(Users => {
                if (
                  (Users.total_count - Users.read_count == 0 &&
                    Users.total_notes_count - Users.read_notes_count == 0) ||
                  (Users.total_count - Users.read_count < 0 ||
                    Users.total_notes_count - Users.read_notes_count < 0) ||
                  (Users.total_count - Users.read_count === NaN &&
                    Users.total_notes_count - Users.read_notes_count === NaN) ||
                  (isNaN(Users.total_count - Users.read_count) == true ||
                    isNaN(Users.total_notes_count - Users.read_notes_count) ==
                      true)
                ) {
                  return (
                    <div key={Users._id}>
                      <SelectableList defaultValue={3} key={Users._id}>
                        <div className="" key={Users._id}>
                          <ListItem
                            key={Users._id}
                            onTouchTap={() => this._handleClick(Users)}
                            value={4}
                            leftAvatar={
                              <Avatar
                                size={40}
                                key={Users._id}
                                color={darkBlack}
                              >
                                {Users.pic}
                              </Avatar>
                            }
                            rightIconButton={
                              <IconMenu
                                key={Users._id}
                                iconButtonElement={iconButtonElement}
                              >
                                <MenuItem
                                  key={Users._id}
                                  onTouchTap={this._handleLeave.bind(
                                    this,
                                    Users
                                  )}
                                >
                                  Leave Group
                                </MenuItem>
                              </IconMenu>
                            }
                            primaryText={Users.roomName}
                            secondaryText={<p />}
                            secondaryTextLines={1}
                          />
                        </div>

                        <Divider inset={true} />
                      </SelectableList>
                    </div>
                  );
                } else {
                  return (
                    <div key={Users._id}>
                      <SelectableList defaultValue={3} key={Users._id}>
                        <div className="" key={Users._id}>
                          <ListItem
                            key={Users._id}
                            onTouchTap={() => this._handleClick(Users)}
                            value={4}
                            leftAvatar={
                              <Avatar
                                size={40}
                                key={Users._id}
                                color={darkBlack}
                              >
                                {Users.pic}
                              </Avatar>
                            }
                            rightIconButton={
                              <IconMenu
                                key={Users._id}
                                iconButtonElement={iconButtonElement}
                              >
                                <MenuItem
                                  key={Users._id}
                                  onTouchTap={this._handleLeave.bind(
                                    this,
                                    Users
                                  )}
                                >
                                  Leave Group
                                </MenuItem>
                              </IconMenu>
                            }
                            primaryText={
                              <div>
                                {Users.roomName}
                                &nbsp;
                                <Badge
                                  badgeStyle={{
                                    color: "black"
                                  }}
                                  primary={true}
                                  badgeContent={
                                    Users.total_count - Users.read_count
                                  }
                                />
                                &nbsp; &nbsp; &nbsp;
                                <Badge
                                  badgeStyle={{
                                    backgroundColor: "#FFEB3B"
                                  }}
                                  badgeContent={
                                    Users.total_notes_count -
                                    Users.read_notes_count
                                  }
                                />
                              </div>
                            }
                          />
                        </div>

                        <Divider inset={true} />
                      </SelectableList>
                    </div>
                  );
                }
              })}
              <Dialog
                title="Leave Group"
                actions={actionsDelete}
                modal={false}
                open={this.state.openDelete}
                onRequestClose={this.handleDeleteClose}
              >
                Are you sure you want to leave the group? This action cannot be
                reversed.
              </Dialog>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Scrollbars>
          </div>
          );{" "}
        </div>
      </MobileTearSheet>
    );
  }
}
