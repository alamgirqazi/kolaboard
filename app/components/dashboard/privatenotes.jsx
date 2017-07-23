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
      opennotes: false
    };
    // socket = io.connect();
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
    socket.emit("addingprivatenotes", { data: data, id: UserStore.obj._id });
    arr.push(data);
  }
  handleTouchTap = () => {
    this.setState({ open: true, snackbaropen: false });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = notes => {
    alert(notes.notes[0]);
    note = notes.notes;
    ChatStore.note = note;
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
    // Store.timetable = true;
    if (!this.state.opennotes) {
      var pnotes = UserStore.obj.privatenotes;
      console.log("Ths " + pnotes);
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
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

                    <IconButton
                      iconStyle={styles.largeIcon}
                      style={styles.large}
                      onTouchTap={this.handleTouchTap}
                    >
                      <HomeIcon style={iconStyles} />
                    </IconButton>
                  </Card>

                  {pnotes.map(Users => {
                    return (
                      <Card className="displ" style={cardwidth}>
                        <CardTitle
                          title={Users.title}
                          subtitle="Card subtitle"
                        />
                        <CardText>
                          {Users.desc}
                        </CardText>
                        <CardActions>
                          <FlatButton
                            label="Open"
                            onTouchTap={() => this.handleOpen(Users)}
                          />
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
                      floatingLabelText="Name"
                      hintText="Enter title here ..."
                      floatingLabelFixed={true}
                      fullWidth={true}
                    />{" "}
                    <TextField
                      ref="txtdesc"
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
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
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
                {note.map(Users => {
                  return (
                    <div className="">
                      <div
                        className="note"
                        style={{ backgroundColor: "#dcf8c6" }}
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
                              primaryText="Details"
                              onTouchTap={this.details}
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
                          <time>{Users.time}</time>&emsp;
                        </Scrollbars>
                      </div>
                      <div className="fixedbutton">
                        <FloatingActionButton
                          // style={style}
                          // onTouchTap={this.handleTouchTap}
                          label="yo"
                          onClick={this.add.bind(null, "new note")}
                        >
                          <ContentAdd />
                        </FloatingActionButton>
                      </div>
                    </div>
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
                    floatingLabelText="Name"
                    hintText="Enter title here ..."
                    floatingLabelFixed={true}
                    fullWidth={true}
                  />{" "}
                  <TextField
                    ref="txtdesc"
                    floatingLabelText="Description"
                    hintText="Enter Description here ..."
                    floatingLabelFixed={true}
                    fullWidth={true}
                  />{" "}
                </Dialog>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}
