import React from "react";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import AppBar from "material-ui/AppBar";
import UserStore from "app/store/UserStore.js";
import FriendshipStore from "app/store/FriendshipsStore.js";
import Snackbar from "material-ui/Snackbar";

import {
  grey400,
  darkBlack,
  lightBlack,
  blue300
} from "material-ui/styles/colors";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import MenuItem from "material-ui/MenuItem";
import AlertContainer from "react-alert";
import ActionInfo from "material-ui/svg-icons/action/account-circle";
const stylebtn = {
  margin: 12
};
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import FontIcon from "material-ui/FontIcon";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ChatStore from "app/store/ChatStore.js";
import { observer } from "mobx-react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const bottomPadding = {
  paddingBottom: "12px"
};
const customContentStyle = {
  width: "30%",
  maxWidth: "none"
};
const customContentWidthStyle = {
  width: "50%",
  maxWidth: "none"
};
// const style =
// {
// left: '35%',
// };
const styleSearch = {
  left: "20%"
};
const style = {
  margin: 12
};
let users;
let favourites;

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>{" "}
  </IconButton>
);
@observer
export default class Chatbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackbar: false,
      openAddUser: false,
      openDialog: false,
      openAdmin: false
    };
  }
  componentDidMount() {
    let userid = localStorage.getItem("userid");

    $.ajax({
      type: "GET",
      url: "/api/userall"
    }).done(function(data) {
      // console.log(data)
      users = data;
      var index = users.findIndex(function(o) {
        return o.user_id === userid;
      });
      users.splice(index, 1);
      UserStore.allUsers = users;
      // var array = [];
      var secondarray = [];
      users.forEach(function(a) {
        for (var i = 0; i < FriendshipStore.myfriendslist.length; i++) {
          //console.log(FriendshipStore.myfriendslist.length);
          if (
            a.user_id == FriendshipStore.myfriendslist[i].other_id ||
            a.user_id == FriendshipStore.myfriendslist[i].user_id
          ) {
            // array[i] = a.user_id;
            secondarray[i] = {
              picture: a.picture,
              name: a.name,
              user_id: a.user_id
            };
          } else {
          }
        }
      });
      // console.log("array");
      // console.log(array);
      // console.log(secondarray);
      FriendshipStore.mappedFriends = secondarray;
    });
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleRequestClose = () => {
    this.setState({ snackbar: false });
  };
  handleShowFav = () => {
    var data = ChatStore.groupId;
    socket.emit("Show Favourites", data);

    socket.on("returned favs", function(data) {
      // console.log(data.msg);
      ChatStore.favourites = data.msg;
    });
    this.setState({ openDialog: true });
  };
  handleAdmin = () => {
    // var data = ChatStore.groupId;
    // socket.emit("Show Favourites", data);

    // socket.on("returned favs", function(data) {
    //   // console.log(data.msg);
    //   ChatStore.favourites = data.msg;
    // });
    this.setState({ openAdmin: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleAdminClose = () => {
    this.setState({ openAdmin: false });
  };
  handleCloseFav = () => {
    this.setState({ openDialog: false });
  };
  _handleClick = Users => {
    this.setState({ openAddUser: true });
    // console.log(Users);
    ChatStore.addUser = Users;
  };
  handleAddUserClose = () => {
    this.setState({ openAddUser: false });
  };
  handleAddtoGroup = () => {
    this.setState({ snackbar: true });

    var user = ChatStore.addUser;
    var data = {
      user_id: user.user_id,
      name: user.name,
      picture: user.picture,
      roomId: ChatStore.groupId,
      roomName: ChatStore.groupname,
      pic: ChatStore.groupavatar, //GROUP PIC
      notes_count: ChatStore.totalmsgscount,
      msgs_count: ChatStore.totalnotescount
    };
    socket.emit("add User to Group", data);
    socket.on("returning participants", function(data) {
      ChatStore.remainparticipants = data[0].remainparticipants;
      ChatStore.participants = data[0].participants;
    });
    var newarray = FriendshipStore.mappedFriends;
    var mappedlength = FriendshipStore.mappedFriends.length;
    var remain = ChatStore.remainparticipants;

    for (var i = 0; i < newarray.length; i++) {
      if (FriendshipStore.mappedFriends[i].user_id === data.user_id) {
        // result = array[i];
        FriendshipStore.mappedFriends[i].present = true;
        break;
      }
    }
    // console.log(newarray);
    // remain.forEach(function(a) {
    //   for (var i = 0; i < mappedlength; i++) {
    //     if (a.user_id == data.user_id) {
    //       // console.log("yers");
    //       FriendshipStore.mappedFriends[i].present = true;
    //     }
    //   }
    // });
    this.setState({ openAddUser: false });
  };

  SendFile = () => {
    var data, xhr;

    data = new FormData();
    data.append("file", $("#file")[0].files[0]);
    console.log(data);
  };

  render() {
    var groupSelected;
    var admin;
    // var admin_id = ChatStore.admin_id;
    if (ChatStore.groupname == " ") {
      groupSelected = true;
    } else false;

    if (ChatStore.admin_id == UserStore.obj.user_id) {
      admin = true;
    } else false;

    // users = ChatStore.participants;
    // favourites = ChatStore.favourites.msgs;
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.handleOpen}>Group Info</MenuItem>
        <MenuItem onTouchTap={this.handleShowFav}>Show Favourites</MenuItem>
        {admin
          ? <MenuItem onTouchTap={this.handleAdmin}>Add More Users</MenuItem>
          : <div />}
      </IconMenu>
    );

    const actionsAdd = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleAddUserClose}
        style={stylebtn}
      />,
      <RaisedButton
        primary={true}
        label="Add to Group"
        onTouchTap={this.handleAddtoGroup}
      />
    ];

    return (
      <div>
        <Snackbar
          open={this.state.snackbar}
          message="User has been added to the group"
          autoHideDuration={2500}
          onRequestClose={this.handleRequestClose}
        />
        <Dialog
          modal={false}
          overlay={false}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <h5>Users in the group:</h5>
          <br />
          {ChatStore.remainparticipants.map(Users => {
            if (Users.user_id == ChatStore.admin_id) {
              return (
                <div key={Users.user_id}>
                  <div className="" key={Users.user_id}>
                    <ListItem
                      key={Users.user_id}
                      leftAvatar={<Avatar size={40} src={Users.picture} />}
                      primaryText={Users.name}
                      rightIcon={<ActionInfo />}
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div key={Users.user_id}>
                  <div className="" key={Users.user_id}>
                    <ListItem
                      key={Users.user_id}
                      leftAvatar={<Avatar size={40} src={Users.picture} />}
                      primaryText={Users.name}
                    />
                  </div>
                </div>
              );
            }
          })}
          <br />
          <h5>
            Created on {ChatStore.created_on}
          </h5>
        </Dialog>
        <Dialog
          modal={false}
          overlay={false}
          onRequestClose={this.handleAdminClose}
          contentStyle={customContentWidthStyle}
          open={this.state.openAdmin}
        >
          <h5>Add more friends</h5>
          <br />
          <br />
          {FriendshipStore.mappedFriends.map(Users => {
            if (Users.present != true) {
              return (
                <div key={Users.user_id}>
                  <ListItem
                    disabled={true}
                    key={Users.user_id}
                    leftAvatar={<Avatar size={40} src={Users.picture} />}
                    primaryText={Users.name}
                    rightIconButton={
                      <RaisedButton
                        label={"Add To Group"}
                        primary={true}
                        key={Users.user_id}
                        onTouchTap={() => this._handleClick(Users)}
                        style={style}
                      />
                    }
                  />{" "}
                  <br />
                </div>
              );
            }
          })}
        </Dialog>
        <Dialog
          title="Add User"
          actions={actionsAdd}
          modal={false}
          open={this.state.openAddUser}
          onRequestClose={this.handleAddUserClose}
        >
          Are you sure you want to Add the user?
        </Dialog>{" "}
        <Dialog
          modal={false}
          overlay={false}
          onRequestClose={this.handleCloseFav}
          contentStyle={customContentStyle}
          open={this.state.openDialog}
          autoScrollBodyContent={true}
        >
          <h5>Favourites in the group:</h5>
          <br />

          {ChatStore.favourites.map(Users => {
            if (Users.favourite == true)
              return (
                <div key={Users.user_id}>
                  <div className="" key={Users.user_id}>
                    {Users.message}&emsp;&emsp;
                    <br />
                    {Users.from}&emsp;&emsp;
                    {Users.time}
                  </div>
                  <br />
                </div>
              );
          })}
          <br />
        </Dialog>
        <Toolbar>
          {groupSelected
            ? <div />
            : <ToolbarGroup firstChild={true}>
                <List>
                  <ListItem
                    onTouchTap={this.handleOpen}
                    leftAvatar={
                      <Avatar size={40} color={darkBlack}>
                        {ChatStore.groupavatar}
                      </Avatar>
                    }
                    primaryText={ChatStore.groupname}
                  />
                </List>
              </ToolbarGroup>}

          <ToolbarGroup lastChild={true} style={bottomPadding}>
            <ListItem rightIconButton={rightIconMenu} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
