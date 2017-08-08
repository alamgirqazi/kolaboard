import React from "react";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import AppBar from "material-ui/AppBar";
import UserStore from "app/store/UserStore.js";
import FriendshipStore from "app/store/FriendshipsStore.js";

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
// const style =
// {
// left: '35%',
// };
const styleSearch = {
  left: "20%"
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
          ? <MenuItem onTouchTap={this.handleAdmin}>Admin</MenuItem>
          : <div />}
      </IconMenu>
    );

    return (
      <div>
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
          contentStyle={customContentStyle}
          open={this.state.openAdmin}
        >
          <h5>Add more friends</h5>
          <br />
          <br />
          {FriendshipStore.mappedFriends.map(Users => {
            return (
              <div key={Users.user_id}>
                <ListItem
                  key={Users.user_id}
                  leftAvatar={<Avatar size={40} src={Users.picture} />}
                  primaryText={Users.name}
                />{" "}
                <br />
              </div>
            );
          })}
        </Dialog>
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

// <form
//           ref="uploadForm"
//           id="uploadForm"
//           a`c`tion="http://localhost:3000/upload"
//           method="post"
//           encType="multipart/form-data"
//         >
//           <input type="file" name="sampleFile" />
//           <input type="submit" value="Upload!" />
//         </form>
//  <ToolbarGroup style={styleSearch}>
//           <IconButton
//             tooltip="search..."
//             touch={true}
//             tooltipPosition="bottom-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//             >
//               <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
//             </svg>
//           </IconButton>
//           <IconButton
//             tooltip="add attachment"
//             touch={true}
//             tooltipPosition="bottom-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//             >
//               <path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z" />
//             </svg>
//           </IconButton>
//         </ToolbarGroup>
