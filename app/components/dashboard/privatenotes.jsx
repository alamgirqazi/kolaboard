import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
// import RaisedButton from "material-ui/RaisedButton";
// import muiThemeable from "material-ui/styles/muiThemeable";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import ContentMore from "material-ui/svg-icons/navigation/expand-more";
import { Scrollbars } from "react-custom-scrollbars";
import Linkifier from "react-linkifier";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import Note from "app/components/Note.jsx";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import SvgIcon from "material-ui/SvgIcon";
import UserStore from "app/store/UserStore.js";
import ChatStore from "app/store/ChatStore.js";
import { observer } from "mobx-react";
import { map } from "mobx";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

// var socket;
var note;
const noteName = {
  fontSize: "0.7rem",
  left: "0",
  bottom: "20px",
  color: "#777",
  position: "absolute"
};
const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400
    //  primary3Color:greenA400,
    //   accent1Color: greenA400,
    //   accent2Color: greenA400,
    //   accent3Color: greenA400

    //this is for changing the theme
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

const spacing = {
  margin: 12
};
const plusBtn = {
  width: "48px",
  height: "48px"
};
const styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  mediumIcon: {
    width: 48,
    height: 48
  },
  largeIcon: {
    width: 60,
    height: 60
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24
  },
  large: {
    width: 120,
    height: 120,
    padding: 30
  }
};

const header = {
  textAlign: "center"
};

const cardwidth = {
  width: "200px",
  margin: "10px",
  height: "200px"
};
const inlinedisplay = {
  display: "inline"
};
const iconStyles = {
  // marginRight: 24,
  marginLeft: "auto",
  marginRight: "auto"
};
const pinstyle = {
  width: "22px",
  height: "22px",
  margin: "0 50px",
  display: "inline-block",
  transform: "rotate(330deg)"
};
const HomeIcon = () =>
  <SvgIcon style={plusBtn}>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>;
@observer
export default class PrivateNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      open: false,
      snackbaropen: false,
      openDelete: false,
      opennotes: false,
      openRename: false,
      editingNotes: false
    };
    // socket = io.connect();
  }
  componentWillMount() {
    UserStore.obj.privatenotes = [];
  }
  add(text) {
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

    var arr = ChatStore.note;
    var data = {
      title: "new note",
      date: date,
      time: time
    };
    console.log("THis is Chatstore.note ", ChatStore.folderId);
    socket.emit("addingprivatenotes", {
      data: data,
      id: UserStore.obj._id,
      folder: ChatStore.folderId
    });
    var data1 = {
      noteId: ChatStore.noteId,
      id: UserStore.obj._id,
      folder: ChatStore.folderId
    };
    arr.push(data);
    socket.on("refreshprinotes", function(data) {
      for (var i = 0; i < data[0].privatenotes.length; i++) {
        if (data[0].privatenotes[i]._id == ChatStore.folderId) {
          ChatStore.mappingnotes = UserStore.obj.privatenotes[i].notes;
          console.log("found match");
        }
      }
      console.log("THis is store sssssssssssssss", UserStore.obj.privatenotes);
      console.log("THis is db sssssssssssssss", data[0].privatenotes);
      // UserStore.obj.privatenotes = data[0].privatenotes;
      console.log("docs[0].privatenotes");
      console.log(data[0].privatenotes);
    });
  }

  handleTouchTap = () => {
    this.setState({ open: true });
    // this.setState({ open: true, snackbaropen: false });
    console.log("New note is opening");
  };
  handleClose = () => {
    this.setState({
      open: false,
      openRename: false,
      editingNotes: false
    });
  };
  delete = Users => {
    console.log("Delete is called ");
    socket.emit("deleteFolder", { note: Users, id: UserStore.obj._id });

    socket.on("remainingpnotes", function(data) {
      console.log("THis is data.privatenotes ", data[0].privatenotes);
      UserStore.obj.privatenotes = data[0].privatenotes;
    });
  };
  back = () => {
    this.setState({
      opennotes: false
    });
  };
  editNote = Users => {
    ChatStore.noteName = Users.title;
    ChatStore.noteId = Users._id;
    console.log("This is users " + ChatStore.noteName);
    this.setState({ editingNotes: true });
    console.log("Rename is called ");
    // socket.emit('deleteFolder',{ data: data, id: UserStore.obj._id,folder:ChatStore.folderId });
  };
  detailNote = Users => {
    console.log("Rename is called ");
    socket.emit("deleteFolder", {
      data: data,
      id: UserStore.obj._id,
      folder: ChatStore.folderId
    });
  };
  deletenote = Users => {
    // ChatStore.pull(Users);
    console.log("Rename is called ");
    socket.emit("deletepnote", {
      data: Users._id,
      id: UserStore.obj._id,
      folder: ChatStore.folderId
    });
  };
  rename = Users => {
    ChatStore.editedNote = Users;
    console.log("Rename is called ");
    this.setState({ openRename: true, snackbaropen: false });
    // socket.emit('deleteFolder',{note:Users,id:UserStore.obj._id});
  };
  saveRename = () => {
    console.log("save Rename is called ");
    this.setState({ openRename: false });
    // socket.emit('deleteFolder',{note:Users,id:UserStore.obj._id});
  };
  handleEditing = () => {
    console.log("save Rename is called ");
    console.log("This is noteId " + ChatStore.noteId);
    console.log("This is folderId " + ChatStore.folderId);
    this.setState({ editingNotes: false });

    ChatStore.notestitleprivate = this.refs.txttitleEdit.getValue();
    socket.emit("editingInsideNote", {
      note: ChatStore.notestitleprivate,
      noteId: ChatStore.noteId,
      id: UserStore.obj._id,
      folderId: ChatStore.folderId
    });
    // this.props.children.text = this.refs.txttitleEdit.getValue();

    socket.on("editedPnotes", function(data) {
      UserStore.obj.privatenotes = data[0].privatenotes;
      for (var i = 0; i < data[0].privatenotes.length; i++) {
        if (data[0].privatenotes[i]._id == ChatStore.folderId) {
          // console.log(i);
          // console.log(data[0].privatenotes[i].notes.length);

          for (var j = 0; j < data[0].privatenotes[i].notes.length; j++) {
            console.log(data[0].privatenotes[i].notes[j]._id);
            if (data[0].privatenotes[i].notes[j]._id == ChatStore.noteId) {
              ChatStore.mappingnotes[j].title = ChatStore.notestitleprivate;

              console.log("j", j);
            }
          }
          // console.log(ChatStore.mappingnotes);
        }
      }
      console.log("eventcalled");
    });
  };
  handleOpen = notes => {
    note = notes.notes;
    ChatStore.mappingnotes = notes.notes;
    ChatStore.note = note;
    ChatStore.folderId = notes._id;
    ChatStore.folderName = notes.title;
    console.log("THis is folder id " + ChatStore.folderId);
    console.log("THis is folder title " + ChatStore.folderName);
    // socket.emit('getting private notes',notes);
    this.setState({ opennotes: true });
  };
  handleSave = () => {
    console.log("inside handlesave");
    console.log(UserStore.obj._id);
    var data = {
      id: UserStore.obj._id,
      title: this.refs.txttitle.getValue(),
      desc: this.refs.txtdesc.getValue()
    };

    console.log("THis is data " + data);
    socket.emit("createpnotes", data);
    this.setState({ open: false });
    socket.emit("gettingpnotes", UserStore.obj._id);
    socket.on("addingpnotes", function(data) {
      console.log("Adding notes ddata " + JSON.stringify(data));
      UserStore.obj.privatenotes = data;
    });
  };
  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        style={spacing}
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Save"
        keyboardFocused={false}
        onTouchTap={this.handleSave}
      />
    ];
    const editActions = [
      <RaisedButton
        label="Cancel"
        style={spacing}
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Save"
        keyboardFocused={false}
        onTouchTap={this.handleEditing}
      />
    ];
    // const actionsRename = [
    //   <RaisedButton
    //     label="Cancel"
    //     style={spacing}
    //     keyboardFocused={false}
    //     onTouchTap={this.handleClose}
    //   />,
    //   <RaisedButton
    //     label="Save"
    //     keyboardFocused={false}
    //     onTouchTap={this.saveRename}
    //   />
    // ];
    // Store.timetable = true;
    if (!this.state.opennotes) {
      var pnotes = UserStore.obj.privatenotes;
      // console.log("Ths " + pnotes);
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            <div>
              <Toolbar />
              <br />
              <h2 style={header}>Private Notes</h2>

              <br />
              <br />
              <br />
              <br />
              <div className="row fullwidth">
                <div className="columns medium-12 large-12">
                  <div style={inlinedisplay}>
                    <Card className="displ" style={cardwidth}>
                      <CardTitle title="Add New Note" subtitle="" />
                      <center>
                        {" "}<IconButton
                          iconStyle={styles.largeIcon}
                          style={styles.large}
                          onTouchTap={this.handleTouchTap}
                        >
                          <HomeIcon style={iconStyles} />
                        </IconButton>
                      </center>
                    </Card>

                    {UserStore.obj.privatenotes.map(Users => {
                      return (
                        <Card className="displ" style={cardwidth}>
                          <IconMenu
                            iconButtonElement={
                              <IconButton
                                style={{
                                  display: "inline",
                                  float: "right",
                                  width: "78px",
                                  height: "22px",
                                  padding: "0px"
                                }}
                                tooltip="more"
                                touch={true}
                                tooltipPosition="bottom-center"
                              >
                                <ContentMore />
                              </IconButton>
                            }
                            anchorOrigin={{
                              horizontal: "left",
                              vertical: "bottom"
                            }}
                            targetOrigin={{
                              horizontal: "left",
                              vertical: "bottom"
                            }}
                          >
                            <MenuItem
                              primaryText="Delete"
                              onTouchTap={this.delete.bind(this, Users)}
                            />
                          </IconMenu>
                          <CardTitle title={Users.title} />
                          <CardText>
                            {Users.desc}
                          </CardText>
                          <CardActions>
                            <center>
                              {" "}<FlatButton
                                label="Open"
                                onTouchTap={() => this.handleOpen(Users)}
                              />
                            </center>
                          </CardActions>
                        </Card>
                      );
                    })}
                    <Dialog
                      title="New Note"
                      actions={actions}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                    >
                      <TextField
                        ref="txttitle"
                        maxLength="25"
                        floatingLabelText="Name"
                        hintText="Enter title here ..."
                        floatingLabelFixed={true}
                        fullWidth={true}
                      />{" "}
                      <TextField
                        ref="txtdesc"
                        maxLength="30"
                        floatingLabelText="Description"
                        hintText="Enter Description here ..."
                        floatingLabelFixed={true}
                        fullWidth={true}
                      />{" "}
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </Scrollbars>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            <div>
              <Toolbar />
              <RaisedButton
                label="Back"
                style={{ float: "left" }}
                onTouchTap={this.back}
              />
              <br />
              <h2 style={header}>Private Notes</h2>

              <br />
              <br />
              <br />
              <br />
              <div className="row fullwidth">
                <h3>
                  {ChatStore.folderName}
                </h3>
                <div className="columns medium-12 large-12">
                  {ChatStore.mappingnotes.map(Users => {
                    return (
                      <div className="pdispl">
                        <div
                          className="note"
                          style={{
                            backgroundColor: "#dcf8c6",
                            width: "200px",
                            height: "200px"
                          }}
                        >
                          <div className="" style={{ display: "inline" }}>
                            {" "}<img
                              style={{
                                display: "inline-block",
                                margin: "0 30px"
                              }}
                              src="assets/images/pin-icon.png"
                              style={pinstyle}
                            />
                            <IconMenu
                              iconButtonElement={
                                <IconButton
                                  style={{
                                    display: "inline",
                                    float: "right",
                                    width: "78px",
                                    height: "22px",
                                    padding: "0px"
                                  }}
                                  tooltip="more"
                                  touch={true}
                                  tooltipPosition="bottom-center"
                                >
                                  <ContentMore />
                                </IconButton>
                              }
                              anchorOrigin={{
                                horizontal: "left",
                                vertical: "bottom"
                              }}
                              targetOrigin={{
                                horizontal: "left",
                                vertical: "bottom"
                              }}
                            >
                              <MenuItem
                                primaryText="Edit"
                                onTouchTap={this.editNote.bind(this, Users)}
                              />
                              <MenuItem
                                primaryText="Delete"
                                onTouchTap={this.deletenote.bind(this, Users)}
                              />
                            </IconMenu>
                          </div>
                          <Scrollbars
                            autoHeightMax={20}
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
                            <p style={{ backgroundColor: "#dcf8c6" }}>
                              <Linkifier>
                                {Users.title}
                              </Linkifier>
                            </p>
                            <time style={noteName}>{Users.time}</time>&emsp;
                          </Scrollbars>
                        </div>
                      </div>
                    );
                  })}
                  <div className="fixedbutton">
                    <FloatingActionButton
                      label="yo"
                      onClick={this.add.bind(null, "new note")}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                  </div>
                  <Dialog
                    title="Edit Note"
                    actions={editActions}
                    modal={false}
                    open={this.state.editingNotes}
                    onRequestClose={this.handleClose}
                  >
                    <TextField
                      ref="txttitleEdit"
                      defaultValue={ChatStore.noteName}
                      floatingLabelText="Title"
                      floatingLabelFixed={true}
                      fullWidth={true}
                    />{" "}
                  </Dialog>
                </div>
              </div>
            </div>
          </Scrollbars>
        </MuiThemeProvider>
      );
    }
  }
}
