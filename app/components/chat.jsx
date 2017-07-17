import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Toolbar from "Toolbar";
import { Scrollbars } from "react-custom-scrollbars";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
// import ContentAdd from "material-ui/svg-icons/content/add";
import Chatbar from "app/components/toolbars/chattoolbar.jsx";
//import ReactScrollbar from 'react-scrollbar-js';
import ChatStore from "app/store/ChatStore.js";
import { observer } from "mobx-react";
import IconButton from "material-ui/IconButton";
import UserStore from "app/store/UserStore.js";
import Store from "app/store/UIstore.js";
import { map } from "mobx";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ActionMore from "material-ui/svg-icons/navigation/expand-more";
import SvgIcon from "material-ui/SvgIcon";
import { blue500, red500, grey300 } from "material-ui/styles/colors";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
var socket;
var today;
var msgs;
var adding;
const style = {
  margin: 12
};
const displayinline = {
  display: "flex",
  backgroundColor: "#00E676"
};
const chatinputbox = {
  height: "3.5rem",
  margin: "0 0 0rem"
};
const starstyle = {
  float: "right",
  height: "20px",
  width: "20px",
  padding: "0px"
};
const delstyle = {
  float: "left",
  height: "20px",
  width: "20px",
  padding: "0px"
};
// color: "#ccc",

const starcolor = {
  color: "#ccc"
};
const inputBoxStyle = {
  width: "100%"
};

const fixedPosition = {
  margin: 12,
  // marginRight: 20,
  //  width: '100%',
  position: "fixed",
  bottom: "5px",
  right: "660px"
};

const heightchat = {
  height: "100%"
  // backgroundColor: "#EDF8F5"
};
@observer
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.sendMsg = this.sendMsg.bind(this);
    socket = io.connect();
    this.state = {};
  }
  componentWillUpdate() {
    // console.log('This is your name '+ UserStore.userrealname)
  }

  handleStar = Users => {
    //    console.log(Users.favourite.toString());
    var data = {
      _id: Users._id
    };

    socket.emit("favourite msg", data);
  };
  sendMsg() {
        var msgs = ChatStore.msgs;
    var roomId = ChatStore.groupId;
        var d = new Date();
        var n = d.getTime();
    socket.emit('pushingMsg', {
        color:"#ccc",
        date: d,
        favourite:false,
        from:UserStore.userrealname,
        message: this.refs.newText.value,
        picture: UserStore.obj.picture,
        time:n
      })

    socket.emit("add user", UserStore);
    // console.log("Send button is pressed");
    // console.log("This is the text " + this.refs.newText.value);
    if (this.refs.newText.value == "") {
    } else {
      socket.emit("send message", {
        msg: this.refs.newText.value,
        roomId: roomId,
        picture: UserStore.obj.picture
      });
      //console.log("This is roomId " + roomId);
      socket.emit("sending", roomId);
      this.refs.newText.value = "";

      socket.on("new message", function(data) {
        var d = new Date();
        var n = d.getTime();
      });

      socket.on("returnmsgs", function(data) {
        ChatStore.msgs = data.msg;
      });
          socket.on('roomMsg',function(data){
  console.log('THis is data coming in roomMsg '+ JSON.stringify(data));
      adding = data;
  console.log('THis is messages '+ msgs);                
        ChatStore.msgs.push(data);
        // msgs.push(data);
})
    }
  }
  render() {
    //  console.log("This is data in store chat " + ChatStore.msgs);
    var users = ChatStore.msgs;
    const liststatus = UserStore.listy;
    // const numbers = [1, 2, 3, 4, 5];
    // console.log("THis is users  " + users);
    const myScrollbar = {
      width: 400,
      height: 400
    };
    const toolbarstyle = {
      top: "0px",
      position: "fixed"
    };
    const HomeIcon = props =>
      <SvgIcon {...props}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </SvgIcon>;

    return (
      <div className="" style={heightchat}>
        <Chatbar style={toolbarstyle} />
        {/*<Infinite containerHeight={500} elementHeight={4} displayBottomUpwards style={styling}> */}
        <Scrollbars
          style={{ height: "100%" }}
          autoHeightMin={0}
          autoHeightMax={500}
          thumbMinSize={30}
        >
          <div>
            <div className="panel">
              <ol className="chat" id="msgList">
                {users.map(Users => {
                  if (Users.favourite == false) {
                    Users.color = "#ccc";
                  } else Users.color = "#F44336";
                  if (Users.from == UserStore.userrealname) {
                    return (
                      <li className="self">
                        <div className="msg">
                          <IconMenu
                            style={{ display: "inline" }}
                            iconButtonElement={
                              <IconButton
                                className="Morebutton"
                                style={delstyle}
                              >
                                <ActionMore />
                              </IconButton>
                            }
                          >
                            <MenuItem primaryText="Edit" />
                            <MenuItem primaryText="Delete" />
                            <MenuItem primaryText="Details" />
                          </IconMenu>
                          <p style={{ wordWrap: "break-word" }}>
                            {Users.message}
                          </p>
                          <IconButton
                            onTouchTap={this.handleStar.bind(this, Users)}
                            style={starstyle}
                          >
                            <HomeIcon color={Users.color} />
                          </IconButton>
                          <time>{Users.time}</time>&emsp;
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li className="other">
                        <Avatar src={Users.picture} />
                        {/*<div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>*/}
                        <div className="msg">
                          <p>
                            {Users.message}
                          </p>
                          <IconButton
                            onTouchTap={this.handleStar.bind(this, Users)}
                            style={starstyle}
                          >
                            <HomeIcon color={Users.color} />
                          </IconButton>

                          <div style={{ display: "inline" }}>
                            <time>{Users.time}</time>&emsp;
                            <sender>{Users.from}</sender>&emsp;{" "}
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
              </ol>

              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </Scrollbars>
        <div className="fixedchatbox">
          <div style={displayinline}>
            <textarea
              ref="newText"
              maxLength="250"
              style={chatinputbox}
              placeholder="Please Enter Your message......."
              className="form-control"
            />
            <IconButton
              tooltip="Send"
              tooltipPosition="top-center"
              onClick={this.sendMsg}
            >
              <svg
                fill="#FFFFFF"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}
