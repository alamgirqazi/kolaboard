import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
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
    primary1Color: greenA400
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
const HomeIcon = () => (
  <SvgIcon style={plusBtn}>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>
);
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
    socket.on("refreshprinotes", function(data) {
      for (var i = 0; i < data[0].privatenotes.length; i++) {
        if (data[0].privatenotes[i]._id == ChatStore.folderId) {
          ChatStore.mappingnotes = data[0].privatenotes[i].notes;
        }
      }
    });
  }

  handleTouchTap = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
      openRename: false,
      editingNotes: false
    });
  };
  delete = Users => {
    socket.emit("deleteFolder", {
      note: ChatStore.notestitleprivate,

      noteId: ChatStore.noteId,
      id: UserStore.obj._id,
      folderid: Users._id,
      folderId: ChatStore.folderId
    });

    socket.on("remainingpnotes", function(data) {
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
    this.setState({ editingNotes: true });
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
    ChatStore.noteId = Users._id;

    socket.emit("deletepnote", {
      data: Users._id,
      id: UserStore.obj._id,
      folder: ChatStore.folderId,
      noteId: ChatStore.noteId
    });
    socket.on("editedDnotes", function(data) {
      UserStore.obj.privatenotes = data[0].privatenotes;
      for (var i = 0; i < data[0].privatenotes.length; i++) {
        if (data[0].privatenotes[i]._id == ChatStore.folderId) {
          ChatStore.mappingnotes = data[0].privatenotes[i].notes;
        }
      }
    });
    socket.on("editedPnotes", function(data) {
      UserStore.obj.privatenotes = data[0].privatenotes;
      for (var i = 0; i < data[0].privatenotes.length; i++) {
        if (data[0].privatenotes[i]._id == ChatStore.folderId) {
          ChatStore.mapping = data[0].privatenotes[i].notes;
          for (var j = 0; j < data[0].privatenotes[i].notes.length; j++) {
            if (data[0].privatenotes[i].notes[j]._id == ChatStore.noteId) {
              ChatStore.mappingnotes[j].title = ChatStore.notestitleprivate;
            }
          }
        }
      }
    });
  };
  rename = Users => {
    ChatStore.editedNote = Users;
    this.setState({ openRename: true, snackbaropen: false });
  };
  saveRename = () => {
    this.setState({ openRename: false });
  };
  handleEditing = () => {
    this.setState({ editingNotes: false });

    ChatStore.notestitleprivate = this.refs.txttitleEdit.getValue();
    socket.emit("editingInsideNote", {
      note: ChatStore.notestitleprivate,

      noteId: ChatStore.noteId,
      id: UserStore.obj._id,
      folderId: ChatStore.folderId
    });
    socket.on("editedPnotes", function(data) {
      UserStore.obj.privatenotes = data[0].privatenotes;
      for (var i = 0; i < data[0].privatenotes.length; i++) {
        if (data[0].privatenotes[i]._id == ChatStore.folderId) {
          for (var j = 0; j < data[0].privatenotes[i].notes.length; j++) {
            if (data[0].privatenotes[i].notes[j]._id == ChatStore.noteId) {
              ChatStore.mappingnotes[j].title = ChatStore.notestitleprivate;
            }
          }
        }
      }
    });
  };
  handleOpen = notes => {
    note = notes.notes;
    ChatStore.mappingnotes = notes.notes;
    ChatStore.note = note;
    ChatStore.folderId = notes._id;
    ChatStore.folderName = notes.title;
    this.setState({ opennotes: true });
  };
  handleSave = () => {
    var data = {
      id: UserStore.obj._id,
      title: this.refs.txttitle.getValue(),
      desc: ""
    };

    socket.emit("createpnotes", data);
    this.setState({ open: false });
    socket.emit("gettingpnotes", UserStore.obj._id);
    socket.on("addingpnotes", function(data) {
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

    if (!this.state.opennotes) {
      var pnotes = UserStore.obj.privatenotes;
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
                        {" "}
                        <IconButton
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
                                  display: "inline-flex",
                                  float: "right",
                                  width: "29px",
                                  height: "29px",
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
                          <CardActions>
                            <center>
                              {" "}
                              <FlatButton
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

              <h2 style={header}>Private Notes</h2>

              <br />
              <br />
              <br />
              <br />
              <div className="row fullwidth">
                <RaisedButton
                  label="Back"
                  style={{ float: "left" }}
                  onTouchTap={this.back}
                />
                <br />
                <br />
                <br />
                <h3>{ChatStore.folderName}</h3>
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
                            {" "}
                            <img
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
                                    display: "inline-flex",
                                    float: "right",
                                    width: "22px",
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
                            renderTrackHorizontal={props => (
                              <div
                                {...props}
                                className="track-horizontal"
                                style={{ display: "none" }}
                              />
                            )}
                            renderThumbHorizontal={props => (
                              <div
                                {...props}
                                className="thumb-horizontal"
                                style={{ display: "none" }}
                              />
                            )}
                          >
                            <p style={{ backgroundColor: "#dcf8c6" }}>
                              <Linkifier>{Users.title}</Linkifier>
                            </p>
                            <time style={noteName}>{Users.time}</time>&emsp;
                          </Scrollbars>
                        </div>
                      </div>
                    );
                  })}
                  <div className="fixedbutton">
                    <FloatingActionButton
                      label="add"
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
