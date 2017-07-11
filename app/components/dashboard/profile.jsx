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
import { Scrollbars } from "react-custom-scrollbars";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import Boards from "app/components/Note.jsx";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
import Toggle from "material-ui/Toggle";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import FlatButton from "material-ui/FlatButton";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import { greenA400, red500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import UserStore from "app/store/UserStore.js";
import { observer } from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";

const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400,
    //  primary3Color:greenA400,
    accent1Color: red500
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
const header = {
  textAlign: "center"
};
const spacing = {
  margin: 12
};
const headColor2 = {
  color: "#A0A4A9",
  marginBottom: 16,

  fontSize: "22px"
};
const style = {
  margin: 12
};
const headColor = {
  color: "#A0A4A9",
  fontSize: "22px"
};
const tableDisplay = {
  display: "table"
};
const greyColor = {
  color: "#A0A4A9"
};
const greyColordesc = {
  // color: "#A0A4A9",
  fontSize: "22px"
};
const inlinedisplay = {
  // color: "#A0A4A9",
  display: "inline"
};
const tailColor = {
  fontSize: "22px"
};
const boldFontWeight = {
  fontWeight: "bold"
};

@observer
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDelete: false,
      snackbaropen: false,
      snackbardeleteopen: false
    };
  }

  handleDeleteToggle = () => {
    if (UserStore.emailnotif == true) {
      UserStore.emailnotif = false;
    } else UserStore.emailnotif = true;

    var data = {
      user_id: UserStore.obj.user_id,
      emailnotif: UserStore.emailnotif
    };
    $.ajax({
      type: "POST",
      url: "/api/user/emailnotif",
      data: data
    })
      .done(function(data) {
        alert("its all over");
      })
      .fail(function(jqXhr) {
        // console.log("failed to register POST REQ");
      });
    console.log(this.state.snackbardeleteopen);
    this.setState({ snackbardeleteopen: true });
  };

  handleToggle = () => {
    this.setState({
      snackbardeleteopen: false
    });
    var data = {
      user_id: UserStore.obj.user_id,
      desc: this.refs.txtDesc.getValue()
    };
    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "/api/user/changedesc",
      data: data
    })
      .done(function(data) {
        alert("its all over");
      })
      .fail(function(jqXhr) {
        // console.log("failed to register POST REQ");
      });
    this.setState({ open: false });
    if (UserStore.obj.desc == this.refs.txtDesc.getValue()) {
    } else {
      UserStore.obj.desc = this.refs.txtDesc.getValue();
      this.setState({
        snackbaropen: true
      });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.setState({
      snackbaropen: false
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteOpen = () => {
    this.setState({
      openDelete: true,
      snackbardeleteopen: false,
      snackbaropen: false
    });
  };

  handleDeleteClose = () => {
    this.setState({ openDelete: false });
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
        onTouchTap={this.handleToggle}
      />
    ];

    const actionsDelete = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleDeleteClose}
        style={style}
      />,
      <RaisedButton
        label="Delete My Account"
        secondary={true}
        onTouchTap={this.handleDeleteClose}
      />
    ];

    // Store.timetable = true;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Toolbar />
          <Scrollbars
            autoHeightMin={0}
            style={{ height: "100vh" }}
            autoHeightMax={50}
            thumbMinSize={50}
          >
            <div style={header}>
              <h3 style={header}>Set up your Profile</h3>
              <br />
              <Avatar size={100} src={UserStore.obj.picture} />
              <br />
              <br />
              <h3 style={greyColor}>
                {UserStore.obj.name}
              </h3>
              <br />
              <Snackbar
                open={this.state.snackbardeleteopen}
                message="Email Notification changed"
                autoHideDuration={2500}
                onRequestClose={this.handleRequestClose}
              />
              <div style={inlinedisplay}>
                <h3 style={greyColordesc}>
                  {UserStore.obj.desc}
                  <IconButton
                    tooltip="edit"
                    touch={true}
                    onTouchTap={this.handleOpen}
                    tooltipPosition="bottom-center"
                  >
                    <svg
                      fill="#000000"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </IconButton>
                </h3>
              </div>
            </div>
            <br />
            <br />
            <Dialog
              title="Delete my account"
              actions={actionsDelete}
              modal={false}
              open={this.state.openDelete}
              onRequestClose={this.handleDeleteClose}
            >
              Are you sure you want to delete? This action cannot be reversed.
            </Dialog>
            <div className="row fullwidth">
              <div className="columns medium-6 large-6">
                <Card>
                  <CardTitle title="Basic information" style={boldFontWeight} />
                  <br />
                  <br />
                  <CardText>
                    <span style={headColor}>Email: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      {UserStore.obj.email}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span style={headColor}>Name: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      {UserStore.obj.name}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span style={headColor}>Nick name: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      {UserStore.obj.nickname}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span style={headColor}>ID: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      {UserStore.obj.user_id}
                    </span>
                    <br />
                    <br />
                    <br />
                    <Toggle
                      onToggle={this.handleDeleteToggle}
                      toggled={UserStore.emailnotif}
                      label="Disable Email Notifications"
                      style={[headColor2]}
                    />
                  </CardText>
                </Card>
              </div>
              <div className="columns medium-1 large-1 padding " />

              <Snackbar
                open={this.state.snackbaropen}
                message="Description changed"
                autoHideDuration={2500}
                onRequestClose={this.handleRequestClose}
              />
              <div>
                <Dialog
                  title="Description"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  <TextField
                    ref="txtDesc"
                    defaultValue={UserStore.obj.desc}
                    floatingLabelFixed={true}
                    fullWidth={true}
                  />{" "}
                </Dialog>
              </div>
              <div className="columns medium-5 large-5 padding ">
                <Card>
                  <CardTitle
                    title="Additional Information"
                    style={boldFontWeight}
                  />
                  <br />
                  <br />
                  <CardText>
                    <span style={headColor}>Email Verified: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      {UserStore.emailverified.toString()}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span style={headColor}>Account: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      {UserStore.useraccount}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span style={headColor}>Total Friend:</span>{" "}
                    <span style={tailColor} className="pull-right">
                      {FriendshipsStore.friendlistcount}
                    </span>
                    <br />
                    <br />
                    <br />
                    <span style={headColor}>Date Created: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      {UserStore.created_at_day}
                    </span>
                    <br />
                    <br />
                    <br />
                    <div className="center-block">
                      <RaisedButton
                        className="center-block"
                        label="Delete my account"
                        secondary={true}
                        style={tableDisplay}
                        onTouchTap={this.handleDeleteOpen}
                      />
                    </div>
                  </CardText>
                </Card>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
            );
          </Scrollbars>
        </div>
      </MuiThemeProvider>
    );
  }
}

// <div className="fullWidth fullheight row expanded">
//
