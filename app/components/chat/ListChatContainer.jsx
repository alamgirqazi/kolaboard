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
import { cyan500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
import UserStore from "app/store/UserStore.js";
import axios from "axios";
import ChatStore from "app/store/ChatStore.js";

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

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Details</MenuItem>
  </IconMenu>
);

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
  }

  _handleClick(Users) {
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
    // var location = 'api/user/' + roomId;

    // $.ajax({
    //     url : location,
    //     type : 'GET',
    //    data: {
    //       format: 'json'
    //    },dataType: 'json',
    //     success : function(data) {
    //       console.log('Successfull');
    //       console.log('This is data comming '+ data);
    // },
    //    error: function(err) {
    //      console.log('error in get of room'+err);
    //    }

    // });
  }
  componentDidMount() {
    // let userid = localStorage.getItem('userid');

    //    $.ajax({
    //     type: 'GET',
    //     url: '/api/userall'
    //     })
    //   .done(function(data) {
    // // console.log(data)
    // users = data;
    // console.log("users");
    // console.log(users);

    // var index = users.findIndex(function(o){
    //      return o.user_id ===userid;
    // })
    // users.splice(index, 1);

    // UserStore.allUsers = users;
    // UserStore.listy=true;
    // })
    //   .fail(function(jqXhr) {
    //     console.log('failed to register');
    //   });
    // var otherusers = new Map(data.map((i) => [i.other_id]));
    // var otherusers = new Map(data.map((i) => [i.key, i.other_id]));

    // var otherusers = data.map(function() {
    //   return data.other_id;
    // });
    // console.log(otherusers)

    //  $.ajax({
    //     type: 'GET',
    //     url: '/api/user/friendlistuser'
    //     })
    //   .done(function(data) {
    // console.log(data);
    // users=data;
    // UserStore.listy=true;

    // })
    //   .fail(function(jqXhr) {
    //     console.log('friendlist mai msla');
    //   });
    //  $.ajax({
    //     type: 'GET',
    //     url: '/api/user/friendlist'
    //     })
    //   .done(function(data) {
    // console.log("meri friendlist");
    // console.log(data);

    // users=data;
    // // otherusers=data.other_id;
    // // realusers=data.user_id;
    // UserStore.listy=true;

    // })
    //   .fail(function(jqXhr) {
    //     console.log('friendlist mai msla');
    //   });
    console.log("inside chatstore if");
    socket.on("msgs", function(data) {
      console.log("This is data in get msgs " + data.msg);
      ChatStore.msgs = data.msg;
      console.log("This is data in chatStore " + ChatStore.msgs);
    });
    var location = "api/user";
    $.ajax({
      url: location,
      type: "GET",
      data: {
        format: "json"
      },
      dataType: "json",
      success: function(data) {
        users = data[0].rooms;
        UserStore.listy = true;
        console.log("This is object " + users);
        //  console.log('This is user  '+ users[1].roomName);

        // console.log('This is users '+ UserStore.obj.rooms);
      },
      error: function() {
        console.log("error in get");
      }
    });
    //    $.ajax({
    //     type: 'GET',
    //     url: '/api/user/groupList'
    //     })
    //   .done(function(data) {
    // console.log("meri Group List");
    // console.log(data);
    // users=data;
    // console.log('This is users '+ users);
    // // otherusers=data.other_id;
    // // realusers=data.user_id;
    // UserStore.listy=true;

    // })
    //   .fail(function(jqXhr) {
    //     console.log('Grouplist mai msla');
    //   });
  }

  render() {
    const liststatus = UserStore.listy;

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

              {liststatus
                ? <div>
                    {users.map(Users => {
                      return (
                        <SelectableList defaultValue={3}>
                          <div className="" key={Users}>

                            <ListItem
                              onTouchTap={() => this._handleClick(Users)}
                              value={4}
                              leftAvatar={
                                <Avatar size={40} src={Users.pic}>
                                  <Badge badgeContent={4} primary={true} />
                                </Avatar>
                              }
                              rightIconButton={rightIconMenu}
                              primaryText={Users.roomName}
                              secondaryText={
                                <p>
                                  This is some random text
                                </p>
                              }
                              secondaryTextLines={2}
                            />
                          </div>

                          <Divider inset={true} />
                        </SelectableList>
                      );
                    })}
                  </div>
                : <div />}

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
