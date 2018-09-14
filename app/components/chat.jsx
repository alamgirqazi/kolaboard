import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Avatar from "material-ui/Avatar";
import Chatbar from "app/components/toolbars/chattoolbar.jsx";
var ReactDOM = require("react-dom");
import { observer } from "mobx-react";
import IconButton from "material-ui/IconButton";
import UserStore from "app/store/UserStore.js";
import Store from "app/store/UIstore.js";
import ChatStore from "app/store/ChatStore.js";
import ActionMore from "material-ui/svg-icons/navigation/expand-more";
import SvgIcon from "material-ui/SvgIcon";
import Dialog from "material-ui/Dialog";
import chatstore from "../store/ChatStore";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

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
  backgroundColor: "#00E676",
  marginLeft:"1%",
  borderRadius:"5px"
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
  color: "#F44336",
  fontWeight: "bold",
  paddingLeft: "10px",
  paddingRight: "10px"
};
const hasbeenadded = {
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "16px",
  color: "#00E676",
  fontWeight: "bold",
  paddingLeft: "10px",
  paddingRight: "10px"
};
const hasbeenremoved = {
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "16px",
  color: "#F44336",
  fontWeight: "bold",
  paddingLeft: "10px",
  paddingRight: "10px"
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
var count = 0;

@observer
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.sendMsg = this.sendMsg.bind(this);
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

  handleStar = Users => {
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
      ChatStore.msgs = data[0].conversation;
    });
  };
  handleDelete = Users => {
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

    socket.on("remainingmsgs", function(data) {
      ChatStore.msgs = data[0].conversation;
    });
  };

  handleDetails = Users => {
    Store.msgdetails = true;
    ChatStore.individualmsg = Users;
  };
  handleNote = Users => {
    var data = {
      roomId: ChatStore.groupId,
      from: Users.from,
      text: Users.message,
      date: Users.date,
      time: Users.time
    };
    socket.emit("addnote", data);
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
  sendMsg() {
    var roomId = ChatStore.groupId;
    socket.emit("add user", UserStore);
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
    if (this.refs.newText.value == "") {
    } else {
      ChatStore.msgs.push({
        color: "#ccc",
        date: date,
        favourite: false,
        from: UserStore.userrealname,
        message: this.refs.newText.value,
        picture: UserStore.obj.picture,
        time: time
      });
      ChatStore.totalmsgscount++;
      ChatStore.totalnotescount++;
      socket.emit("send message", {
        msg: this.refs.newText.value,
        roomId: roomId,
        picture: UserStore.obj.picture,
        sendTo: ChatStore.groupname
      });
      socket.on("chat messagey", function(msg) {
        if (
          chatstore.msgs[chatstore.msgs.length - 1].message != msg.message ||
          chatstore.msgs[chatstore.msgs.length - 1].from != msg.from ||
          chatstore.msgs[chatstore.msgs.length - 1].date != msg.date
        ) {
          ChatStore.msgs.push(msg);
        } else {
        }
      });
      socket.emit("recieving msgs", ChatStore.groupId);
      socket.on("remaining msgs", function(data) {
        ChatStore.msgs = data[0].conversation;
      });
      socket.on("Message for my own", function(data) {
        ChatStore.msgs = data[0].conversation;
      });

      this.refs.newText.value = "";

      var data = {
        user_id: UserStore.obj.user_id,
        _id: ChatStore.groupId,
        count: ChatStore.msgs.length,
        participants: ChatStore.participants
      };
      socket.emit("readcount send", data);
    }
  }

  render() {
    var groupSelected;
    if (ChatStore.groupname == " ") {
      groupSelected = true;
    } else false;

    var users = ChatStore.msgs;
    const liststatus = UserStore.listy;

    const myScrollbar = {
      width: 400,
      height: 400
    };
    const toolbarstyle = {
      top: "0px",
      position: "fixed"
    };
    const HomeIcon = props => (
      <SvgIcon {...props}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </SvgIcon>
    );

    return (
      <div className="" style={heightchat}>
        <Chatbar style={toolbarstyle} />
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
                  var add;
                  if (Users.message == "HAS BEEN ADDED TO THE GROUP") {
                    add = true;
                  }
                  var remove;
                  if (Users.message == "HAS BEEN REMOVED FROM THE GROUP") {
                    remove = true;
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
                    if (
                      Users.message == "USER HAS LEFT THE GROUP" ||
                      "HAS BEEN ADDED TO THE GROUP" ||
                      "HAS BEEN REMOVED FROM THE GROUP"
                    ) {
                      if (Users.message == "USER HAS LEFT THE GROUP") {
                        return (
                          <div>
                            <br />

                            {Users.from + " has left the group"}
                            <br />
                          </div>
                        );
                      }
                      if (Users.message == "HAS BEEN ADDED TO THE GROUP") {
                        return (
                          <div style={hasbeenadded}>
                            <br />

                            {Users.from + " has been added to the group"}
                            <br />
                          </div>
                        );
                      }
                      if (Users.message == "HAS BEEN REMOVED FROM THE GROUP") {
                        return (
                          <div style={hasbeenremoved}>
                            {Users.from + " has been removed from the group"}
                            <br />
                          </div>
                        );
                      }
                    }
                    return (
                      <div>
                        {left ? (
                          <h6 style={leftGroup}>
                            <br />
                            {Users.from} has left the group.
                            <br />
                          </h6>
                        ) : (
                          <div>
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
                                <p>{Users.message}</p>
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
                          </div>
                        )}
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
              <h5>Creator : {ChatStore.individualmsg.from}</h5>
              <h5>Date : {ChatStore.individualmsg.date}</h5>
              <h5>Time : {ChatStore.individualmsg.time}</h5>
              <h5>msg: {ChatStore.individualmsg.message}</h5>
            </div>
            <br />
          </Dialog>
          {groupSelected ? (
            <div />
          ) : (
            <div style={displayinline}>
              <textarea
                ref="newText"
                maxLength="250"
                style={chatinputbox}
                placeholder="Please Enter Your message......."
                className="form-control"
                id="messagetextarea"
              />
              <IconButton
                tooltip="Send"
                tooltipPosition="top-center"
                onClick={this.sendMsg}
                style = {{marginTop:"1.4%"}}
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
          )}
        </div>
      </div>
    );
  }
}
