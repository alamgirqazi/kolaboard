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

import Boards from "app/components/Note.jsx";
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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import UserStore from "app/store/UserStore.js";
import { observer } from "mobx-react";

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
const header = {
  textAlign: "center"
};
const headColor = {
  color: "#A0A4A9",
  fontSize: "22px"
};
const greyColor = {
  color: "#A0A4A9"
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
  }

  render() {
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
            </div>
            <br />
            <br />
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
                  </CardText>
                </Card>
              </div>
              <div className="columns medium-1 large-1 padding " />

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
                      {UserStore.obj.email_verified}
                    </span>
                    <br />
                    <br />
                    <br /> <span style={headColor}>Account: </span>{" "}
                    <span style={tailColor} className="pull-right" />
                    <br />
                    <br />
                    <br /> <span style={headColor}>Date Created: </span>{" "}
                    <span style={tailColor} className="pull-right">
                      <br />
                      <br />
                      <br /> {UserStore.obj.created_at}
                    </span>
                    <br /> <br />
                    <br /> <span style={headColor}>Total Friend:</span>{" "}
                    <span style={tailColor} className="pull-right">
                      bleh
                    </span>
                    <br />
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
