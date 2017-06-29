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
          <div style={header}>
            <h3 style={header}>Set up your Profile</h3>
            <br />
            <Avatar size={100} src={UserStore.obj.picture} />
            <br />
            <br />
            <h3>
              {UserStore.obj.name}
            </h3>
          </div>
          <br />
          <hr />
          <br />
          <div className="row fullwidth">
            <div className="columns medium-6 large-6">
              <Card>
                <CardTitle title="Basic information" />
                <CardText>
                  <h5>Email: </h5> <h5>{UserStore.obj.email}</h5>
                  <br />
                  <h5>Name: </h5> <h5>{UserStore.obj.name}</h5>
                  <br />
                  <h5>Nick name: </h5> <h5>{UserStore.obj.nickname}</h5>
                  <br />
                </CardText>
              </Card>
            </div>
            <div className="columns medium-1 large-1 padding " />

            <div className="columns medium-5 large-5 padding ">
              <Card>
                <CardTitle title="Additional Information" />
                <CardText>
                  <p>Hey this is a card</p>
                </CardText>
              </Card>
            </div>
          </div>
          );
        </div>
      </MuiThemeProvider>
    );
  }
}

// <div className="fullWidth fullheight row expanded">
