import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import muiThemeable from "material-ui/styles/muiThemeable";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

import React, { Component } from "react";
import PropTypes from "prop-types";
import MobileTearSheet from "app/api/MobileTearSheet.js";
import Badge from "material-ui/Badge";
import { List, ListItem, makeSelectable } from "material-ui/List";
import Divider from "material-ui/Divider";
import FileFolder from "material-ui/svg-icons/file/folder";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import {
  grey400,
  darkBlack,
  lightBlack,
  blue300
} from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
var Infinite = require("react-infinite");
import { Scrollbars } from "react-custom-scrollbars";
import Msgbar from "app/components/toolbars/msgtoolbar.jsx";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
import TimeTable from "app/components/dashboard/timetable.jsx";
import Events from "app/components/dashboard/events.jsx";
import Main from "app/components/main.jsx";
import { observer } from "mobx-react";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500, grey50, grey900 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
import UserStore from "app/store/UserStore.js";
import axios from "axios";
import ChatStore from "app/store/ChatStore.js";

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
      console.log("list clickedeed");
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

const style = {
  height: "100%"
};
var listmap;
let users = [];
// let otherusers = [];
let realusers = [];

var socket;
@observer
export default class ListChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    socket = io.connect();
    this.state = {};
    // UserStore.obj.rooms = [];
  }

  _handleClick(Users) {
    console.log(Users._id + "_id");
    // console.log(Users.roomId + "_id");
    ChatStore.btnClick = true;

    console.log("listttt");
    // alert('ok')
    // console.log(Users.picture)
    // ChatStore.groupavatar = Users.picture;
    ChatStore.groupId = Users.roomId;
    ChatStore.groupname = Users.roomName;
    ChatStore.groupavatar = Users.pic;
    console.log("This is name " + ChatStore.groupname);
    console.log("This is id " + ChatStore.groupId);
    var roomId = ChatStore.groupId;
    console.log("THis is roomID in chat store " + roomId);
    console.log("room " + roomId);
    socket.emit("roomId", roomId);
    var location = "/api/rooms/" + roomId;

    socket.emit("noteSocket", roomId);
    socket.emit("note map", roomId);
    $.ajax({
      url: location,
      type: "GET",
      data: {
        format: "json"
      },
      dataType: "json",
      success: function(data) {
        console.log("Successfull Rooms got");
        // ChatStore.notes = data[0].notes;

        //  console.log(data[0].notes);
        ChatStore.participants = JSON.parse(data[0].participants);
      },
      error: function(err) {
        console.log("error in get of room" + err);
      }
    });
  }
  componentDidMount() {
    console.log("UserStore");
    console.log(UserStore);

    console.log("inside chatstore if");
    socket.on("msgs", function(data) {
      console.log("This is data in get msgs " + data.msg);
      ChatStore.msgs = data.msg;
      console.log("This is data in chatStore " + ChatStore.msgs);
    });
    socket.on("dbnotes", function(data) {
      console.log("data.dbnotes");
      console.log(data.dbnotes);
      ChatStore.notes = data.dbnotes;
    });
  }

  render() {
    const iconButtonElement = (
      <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Details</MenuItem>
        <MenuItem>Leave Group</MenuItem>
      </IconMenu>
    );

    const liststatus = UserStore.listy;
    if (UserStore.obj.rooms == null || UserStore.obj.rooms == undefined)
      rooms = [];
    else rooms = UserStore.obj.rooms;

    // console.log(UserStore.obj.rooms);
    // console.log("rooms");
    console.log(rooms);
    return (
      <div>
        <div className="margin" style={style}>
          <MobileTearSheet>
            <Msgbar />
            <input type="search" placeholder="Search Messages here....." />
            <Subheader>Today</Subheader>

            <Scrollbars
              autoHeightMin={0}
              style={{ height: "100vh" }}
              autoHeightMax={50}
              thumbMinSize={50}
            >
              {rooms.map(Users => {
                return (
                  <div>
                    <SelectableList defaultValue={3}>
                      <div className="" key={Users}>
                        <ListItem
                          onTouchTap={() => this._handleClick(Users)}
                          value={4}
                          leftAvatar={
                            <Avatar size={40} color={darkBlack}>
                              {Users.pic}
                            </Avatar>
                          }
                          rightIconButton={rightIconMenu}
                          primaryText={Users.roomName}
                          secondaryText={<p>This</p>}
                          secondaryTextLines={1}
                        />
                      </div>

                      <Divider inset={true} />
                    </SelectableList>
                  </div>
                );
              })}
              }
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
              {/*</Infinite>*/}
            </Scrollbars>
          </MobileTearSheet>
        </div>
        );{" "}
      </div>
    );
  }
}

//  {liststatus
//                 ? <div>
//                     {rooms.map(Users => {
//                       return (
//                         <SelectableList defaultValue={3}>
//                           <div className="" key={Users}>
//                             <ListItem
//                               onTouchTap={() => this._handleClick(Users)}
//                               value={4}
//                               leftAvatar={
//                                 <Avatar size={40} src={Users.pic}>
//                                   <Badge badgeContent={4} primary={true} />
//                                 </Avatar>
//                               }
//                               rightIconButton={rightIconMenu}
//                               primaryText={Users.roomName}
//                               secondaryText={<p>This is some random text</p>}
//                               secondaryTextLines={2}
//                             />
//                           </div>

//                           <Divider inset={true} />
//                         </SelectableList>
//                       );
//                     })}
//                   </div>
//                 : <div />}                              <Badge badgeContent={4} primary={true} />
