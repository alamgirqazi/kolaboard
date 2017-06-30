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
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import { greenA400, red500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Avatar from "material-ui/Avatar";

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

const style = {
  margin: 12
};
const header = {
  textAlign: "center"
};
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleClose}
        style={style}
      />,
      <RaisedButton
        label="Delete My Account"
        secondary={true}
        onTouchTap={this.handleClose}
      />
    ];
    // Store.timetable = true;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Toolbar />
          <div className="container">
            <h3 style={header}>Settings</h3>
            <br />
            <br />
            <div className="row">
              <div className="col-xs-12 col-md-12 col-lg-12">
                <Card>
                  <CardTitle title="" />
                  <br />
                  <br />
                  <p>HEYYYYYYYYY</p>
                  <RaisedButton
                    label="Delete my account"
                    secondary={true}
                    style={style}
                    onTouchTap={this.handleOpen}
                  />

                  <CardText />

                  <br />
                  <br />
                  <br />
                </Card>

                <Dialog
                  title="Delete my account"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  Are you sure you want to delete? This action cannot be
                  reversed.
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
