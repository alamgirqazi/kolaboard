import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Toolbar from "Toolbar";
import { Scrollbars } from "react-custom-scrollbars";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
// import ContentAdd from "material-ui/svg-icons/content/add";
import Chatbar from "app/components/toolbars/chattoolbar.jsx";
var ReactDOM = require("react-dom");

//import ReactScrollbar from 'react-scrollbar-js';
import { observer } from "mobx-react";
import IconButton from "material-ui/IconButton";
import UserStore from "app/store/UserStore.js";
import Store from "app/store/UIstore.js";
import ChatStore from "app/store/ChatStore.js";
import { map } from "mobx";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ActionMore from "material-ui/svg-icons/navigation/expand-more";
import SvgIcon from "material-ui/SvgIcon";
import { blue500, red500, grey300 } from "material-ui/styles/colors";
import Dialog from "material-ui/Dialog";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
// var socket;
var today;
var msgs;
var adding;
const style = {
  margin: 12
};
const customContentStyle = {
  width: "30%",
  maxWidth: "none"
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
const morestyle = {
  float: "right",
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
const leftGroup = {
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "16px",
  color: "#F44336"
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
    // socket = io.connect();
    this.scrollToBottom = this.scrollToBottom.bind(this);

    var data = {
      roomId: ChatStore.groupId
    };
    socket.emit("retrieve msgs", data);
    socket.on("chat msgs", function(data) {
      ChatStore.msgs = data[0].conversation;
    });
    this.state = {
      status: false,
      showfav: false
    };
  }
  componentWillReceiveProps(nextProps) {
    var data = {
      roomId: ChatStore.groupId
    };
    socket.emit("retrieve msgs", data);
    socket.on("chat msgs", function(data) {
      ChatStore.msgs = data[0].conversation;
    });
  }

  componentDidMount() {
    var data = {
      roomId: ChatStore.groupId
    };
    socket.emit("retrieve msgs", data);
    this.scrollToBottom();

    socket.on("chat msgs", function(data) {
      ChatStore.msgs = data[0].conversation;
    });
  }
  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }

  // setInterval(
  //   function() {
  //     var data = {
  //       roomId: ChatStore.groupId
  //     };
  //     socket.emit("retrieve msgs", data);
  //     socket.on("chat msgs", function(data) {
  //       ChatStore.msgs = data[0].conversation;
  //     });
  //   }.bind(this),
  //   1500
  // );

  handleStar = Users => {
    //    console.log(Users.favourite.toString());
    var result;
    if (Users.favourite == true) {
      result = false;
    } else result = true;
    var data = {
      _id: Users._id,
      roomId: ChatStore.groupId,
      star: result
    };

    socket.emit("favourite msg", data);
    this.setState({
      status: true
    });
    socket.on("remainingmsgs", function(data) {
      ///   console.log("da");
      // console.log(data[0].conversation);

      ChatStore.msgs = data[0].conversation;
    });
  };
  handleDelete = Users => {
    // alert(Users._id);
    var data = {
      _id: Users._id,
      roomId: ChatStore.groupId
    };

    socket.emit("msg delete", data);

    var data1 = {
      user_id: UserStore.obj.user_id,
      _id: ChatStore.groupId,
      count: ChatStore.msgs.length,
      participants: ChatStore.participants
    };
    socket.emit("readcount delete", data1);

    // socket.emit("readcount send", data1);

    socket.on("remainingmsgs", function(data) {
      ChatStore.msgs = data[0].conversation;
    });
  };

  handleDetails = Users => {
    Store.msgdetails = true;
    ChatStore.individualmsg = Users;
  };
  handleNote = Users => {
    // Store.msgdetails = true;
    // ChatStore.individualmsg = Users;
    // console.log(Users);
    var data = {
      roomId: ChatStore.groupId,
      from: Users.from,
      text: Users.message,
      date: Users.date,
      time: Users.time
    };
    socket.emit("addnote", data);
    // ChatStore.notes.push(data);
    socket.emit("recieving msgs", ChatStore.groupId);
    socket.on("remaining msgs", function(data) {
      ChatStore.notes = data[0].notes;
    });
  };
  handleClose = () => {
    Store.msgdetails = false;
  };
  handleCloseFav = () => {
    this.setState({
      showfav: false
    });
  };
  // renderView = () => {
  //   // this.refs.scrollbars.scrollToTop();
  // };
  sendMsg() {
    var roomId = ChatStore.groupId;
    socket.emit("add user", UserStore);
    // this.refs.scrollbars.scrollToTop();
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
    // console.log("Send button is pressed");
    // console.log("This is the text " + this.refs.newText.value);
    if (this.refs.newText.value == "") {
    } else {
      ChatStore.msgs.push({
        from: UserStore.userrealname,
        message: this.refs.newText.value,
        favourite: false,
        date: date,
        time: time,
        //   var d = new Date();
        //   var n = d.getTime();
        picture: UserStore.obj.picture
      });

      ChatStore.totalmsgscount++;
      ChatStore.totalnotescount++;
      // console.log("ChatStore.groupname");
      // console.log(ChatStore.groupname);
      socket.emit("send message", {
        msg: this.refs.newText.value,
        roomId: roomId,
        picture: UserStore.obj.picture,
        sendTo: ChatStore.groupname
      });
      socket.on("chat messagey", function(msg) {
        ChatStore.msgs.push(msg);
        // ChatStore.msgs = docs[0].conversation;
        // console.log("docs[0].conversation");
        // console.log(docs[0].conversation);
        // socket.on("remaining msgs", function(data) {
        //   ChatStore.msgs = data[0].conversation;
        // });
      });
      socket.emit("recieving msgs", ChatStore.groupId);
      socket.on("remaining msgs", function(data) {
        ChatStore.msgs = data[0].conversation;
      });

      this.refs.newText.value = "";

      var data = {
        user_id: UserStore.obj.user_id,
        _id: ChatStore.groupId,
        count: ChatStore.msgs.length + 1,
        participants: ChatStore.participants

        //ChatStore.readcount = Object.keys(data[0].conversation).length;
      };
      socket.emit("readcount send", data);

      // socket.emit("calculate conversations", result);
    }
  }

  render() {
    var groupSelected;
    if (ChatStore.groupname == " ") {
      groupSelected = true;
    } else false;

    //  console.log("This is data in store chat " + ChatStore.msgs);
    var users = ChatStore.msgs;
    const liststatus = UserStore.listy;
    // const numbers = [1, 2, 3, 4, 5];
    // console.log("THis is users  " + users);
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
          ref="scrollbars"
          style={{ height: "100%" }}
          autoHeightMin={0}
          autoHeightMax={500}
          thumbMinSize={30}
        >
          <div>
            <div className="panel">
              <ol className="chat" id="msgList">
                {users.map(Users => {
                  var left;
                  if (Users.message == "HAS LEFT THE GROUP") {
                    left = true;
                  }

                  if (Users.favourite == false) {
                    Users.color = "#ccc";
                  } else Users.color = "#F44336";
                  if (Users.from == UserStore.userrealname) {
                    return (
                      <li className="self" key={Users._id}>
                        <div className="msg" key={Users._id}>
                          <IconMenu
                            key={Users._id}
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
                            <MenuItem
                              primaryText="Add To Noteboard"
                              onTouchTap={this.handleNote.bind(this, Users)}
                            />
                            <MenuItem
                              primaryText="Details"
                              onTouchTap={this.handleDetails.bind(this, Users)}
                            />
                            <MenuItem
                              primaryText="Delete"
                              onTouchTap={this.handleDelete.bind(this, Users)}
                            />
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
                    if (Users.message == "USER HAS LEFT THE GROUP") {
                      return (
                        <div>
                          {Users.from + " has left the group"}
                        </div>
                      );
                    }
                    return (
                      <div>
                        {left
                          ? <h6 style={leftGroup}>
                              <br />
                              {Users.from} has left the group.
                              <br />
                            </h6>
                          : <div>
                              <li className="other" key={Users._id}>
                                <Avatar src={Users.picture} />
                                <div className="msg" key={Users._id}>
                                  <IconMenu
                                    style={{ display: "inline" }}
                                    iconButtonElement={
                                      <IconButton
                                        className="Morebutton"
                                        style={morestyle}
                                      >
                                        <ActionMore />
                                      </IconButton>
                                    }
                                  >
                                    <MenuItem
                                      primaryText="Details"
                                      onTouchTap={this.handleDetails.bind(
                                        this,
                                        Users
                                      )}
                                    />
                                  </IconMenu>
                                  <p>
                                    {Users.message}
                                  </p>
                                  <IconButton
                                    onTouchTap={this.handleStar.bind(
                                      this,
                                      Users
                                    )}
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
                            </div>}
                      </div>
                    );
                  }
                })}
              </ol>

              <br
                ref={el => {
                  this.messagesContainer = el;
                }}
              />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </Scrollbars>
        <div className="fixedchatbox">
          <Dialog
            modal={false}
            overlay={false}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
            open={Store.msgdetails}
          >
            <h5>Msg details</h5>
            <br />
            <div className="">
              <h5>
                Creator : {ChatStore.individualmsg.from}
              </h5>
              <h5>
                Date : {ChatStore.individualmsg.date}
              </h5>
              <h5>
                Time : {ChatStore.individualmsg.time}
              </h5>
              <h5>
                msg: {ChatStore.individualmsg.message}
              </h5>
            </div>
            <br />
          </Dialog>
          {groupSelected
            ? <div />
            : <div style={displayinline}>
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
              </div>}
        </div>
      </div>
    );
  }
}
