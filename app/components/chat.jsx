import React from "react";
import RaisedButton from "material-ui/RaisedButton";
var Infinite = require("react-infinite");
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

var socket;
var today;
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
    //  this.getMsgs = this.getMsgs.bind(this);
    socket = io.connect();
    // socket = io.connect('http://localhost:3000');
    this.state = {};
  }
  componentWillMount() {
    // console.log('This is your name '+ UserStore.userrealname)
  }
  sendMsg() {
    var roomId = ChatStore.groupId;
    socket.emit("add user", UserStore);
    console.log("Send button is pressed");
    console.log("This is the text " + this.refs.newText.value);
    socket.emit("send message", {
      msg: this.refs.newText.value,
      roomId: roomId
    });
    console.log("This is roomId " + roomId);
    socket.emit("sending", roomId);
    this.refs.newText.value = "";

    socket.on("new message", function(data) {
      var d = new Date();
      var n = d.getTime();
      console.log(
        "This is the username of " +
          data.username +
          "and this is message " +
          data.msg +
          "and this is picture " +
          data.pic
      );
      // var list = document.getElementById("msgList");
      // console.log("THis is my socket.id " + socket.id);
      // // if(data.id == socket.io){
      // var d = new Date();
      // $("#msgList").append(
      //   '<li class="other"><div class="avatar"><img src=' +
      //     data.pic +
      //     ' draggable="false"/></div><div class="msg"><p>' +
      //     data.msg +
      //     "</p><time>" +
      //     d.getHours() +
      //     ":" +
      //     d.getMinutes() +
      //     "</time><sender>" +
      //     data.username +
      //     "</sender></div></li>"
      // );
      // }
      // else {
      //   $("#msgList").append('<li class="self"><div class="msg"><p> '+data.msg+' </p><time>20:18</time></div></li>');
      // }
      // list.append('<div class="well"><strong>'+data.username+'</strong>:'+data.msg+'</div>')
    });
    socket.on("returnmsgs", function(data) {
      console.log("This is data in get msgs " + data.msg);
      ChatStore.msgs = data.msg;
      console.log(data.msg);
      console.log("This is data in chatStore " + ChatStore.msgs);
    });
  }

  render() {
    console.log("This is data in store chat " + ChatStore.msgs);
    var users = ChatStore.msgs;
    const liststatus = UserStore.listy;
    // const numbers = [1, 2, 3, 4, 5];
    console.log("THis is users  " + users);
    const myScrollbar = {
      width: 400,
      height: 400
    };

    const toolbarstyle = {
      top: "0px",
      position: "fixed"
    };

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
                  if (Users.from == UserStore.userrealname) {
                    return (
                      <li className="self">
                        <div className="msg">
                          <p>
                            {Users.message}
                          </p>
                          <time>
                            {Users.time}
                          </time>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li className="other">
                        <Avatar src="http://i.imgur.com/HYcn9xO.png" />
                        {/*<div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>*/}
                        <div className="msg">
                          <p>
                            {Users.message}
                          </p>

                          <time>
                            {Users.time}
                          </time>
                          <sender>
                            {Users.from}
                          </sender>
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
              style={chatinputbox}
              placeholder="Please Enter Your message......."
              className="form-control"
            />
            <IconButton
              tooltip="Send"
              tooltipPosition="top-centre"
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
// <li className="self">
//     {/*<div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>*/}
//   <div className="msg">
//     <p>But first he stabs Dolores.</p>

//     <time>20:18</time>
//   </div>
// // </li>
//   <div className="avatar">
//                           <div className="avatar">
//                             <img
//                               src="http://i.imgur.com/HYcn9xO.png"
//                               draggable="false"
//                             />
//                           </div>
//                         </div>
