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
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import TextField from "material-ui/TextField";

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import UserStore from "app/store/UserStore.js";
import { observer } from "mobx-react";
const spacing = {
  margin: 12
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

const header = {
  textAlign: "center"
};

const topdiv = {
  marginBottom: "10px"
};
const width = {
  width: "700px"
};
let socket;
var mydata = [];
@observer
export default class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    socket = io.connect();
    // UserStore.obj.timetable[0].monday = [{"":""}];
    this.state = {
      open: false,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: "500px"
    };
  }
  componentDidMount() {
    //    socket.emit("timetable", UserStore.obj.user_id);
    Store.timetable = true;
    // socket.on("timetable send", function(data) {
    //   console.log(data);
    //   console.log("data");
    // mydata = data;
    //    });
  }
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleSave = () => {
    this.setState({
      open: false
    });

    var data = {
      user_id: UserStore.obj.user_id,
      id: UserStore.currentId,
      value: this.refs.txtname.getValue(),
      currentFunction: UserStore.currentFunction
    };
    // console.log("data");
    UserStore.currentValue = this.refs.txtname.getValue();
    socket.emit("HandleOpen", data);

    socket.on("timetable", function(data) {
      console.log("data");
      console.log(data);
      UserStore.obj.timetable = data[0].timetable;
    });
  };
  // handleOpenM = row => {
  //   console.log(row);
  //   alert(row.M);

  //   UserStore.currentValue = row.M;
  //   UserStore.currentId = row.id;
  //   UserStore.currentFunction = "M";

  //   var data = {
  //     user_id: UserStore.obj.user_id,
  //     row: row
  //   };
  //   console.log("data");
  //   console.log(data);
  //   socket.emit("HandleOpenM", data);
  // };
  // handleOpenM = row => {
  //   console.log(row);
  //   alert(row.M);

  //   UserStore.currentValue = row.M;
  //   UserStore.currentId = row.id;
  //   UserStore.currentFunction = "M";

  //   var data = {
  //     user_id: UserStore.obj.user_id,
  //     row: row
  //   };
  //   console.log("data");
  //   console.log(data);
  //   socket.emit("HandleOpenM", data);
  // };
  handleOpenM = row => {
    console.log(row);

    UserStore.currentValue = row.M;
    UserStore.currentId = row.id;
    UserStore.currentFunction = "M";
    this.setState({
      open: true
    });
    var data = {
      user_id: UserStore.obj.user_id,
      row: row
    };
    console.log("data");
    console.log(data);
    // socket.emit("HandleOpenM", data);
  };
  handleOpenF = row => {
    console.log(row);
    this.setState({
      open: true
    });
    UserStore.currentValue = row.F;
    UserStore.currentId = row.id;
    UserStore.currentFunction = "F";

    var data = {
      user_id: UserStore.obj.user_id,
      row: row
    };
    console.log("data");
    console.log(data);
    //    socket.emit("HandleOpenM", data);
  };
  handleOpenT = row => {
    console.log(row);
    this.setState({
      open: true
    });
    UserStore.currentValue = row.T;
    UserStore.currentId = row.id;
    UserStore.currentFunction = "T";

    var data = {
      user_id: UserStore.obj.user_id,
      row: row
    };
    console.log("data");
    console.log(data);
    //socket.emit("HandleOpenM", data);
  };
  handleOpenW = row => {
    console.log(row);
    this.setState({
      open: true
    });
    UserStore.currentValue = row.W;
    UserStore.currentId = row.id;
    UserStore.currentFunction = "W";

    var data = {
      user_id: UserStore.obj.user_id,
      row: row
    };
    console.log("data");
    console.log(data);
    //  socket.emit("HandleOpenM", data);
  };
  handleOpenTh = row => {
    console.log(row);
    this.setState({
      open: true
    });
    UserStore.currentValue = row.M;
    UserStore.currentId = row.id;
    UserStore.currentFunction = "M";

    var data = {
      user_id: UserStore.obj.user_id,
      row: row
    };
    console.log("data");
    console.log(data);
    socket.emit("HandleOpenM", data);
  };
  handleOpenS = row => {
    console.log(row);
    this.setState({
      open: true
    });
    UserStore.currentValue = row.S;
    UserStore.currentId = row.id;
    UserStore.currentFunction = "S";

    var data = {
      user_id: UserStore.obj.user_id,
      row: row
    };
    console.log("data");
    console.log(data);
    ///  socket.emit("HandleOpenM", data);
  };
  handleOpenSu = row => {
    console.log(row);

    this.setState({
      open: true
    });
    UserStore.currentValue = row.Su;
    UserStore.currentId = row.id;
    UserStore.currentFunction = "Su";

    var data = {
      user_id: UserStore.obj.user_id,
      row: row
    };
    console.log("data");
    console.log(data);
    //  socket.emit("HandleOpenM", data);
  };
  // handleOpen = row => {
  //   // socket.emit("handleOpenTime", row);
  //   console.log(row);
  //   var data = {
  //     user_id: UserStore.obj.user_id,
  //     row: row
  //   };
  //   console.log("data");
  //   console.log(data);
  //   socket.emit("HandleOpenM", data);
  // };
  // handleOpenTime = row => {
  //   // socket.emit("handleOpenTime", row);
  //   var data = {
  //     user_id: UserStore.obj.user_id,
  //     row: row
  //   };
  //   console.log("data");
  //   console.log(data);
  //   socket.emit("HandleOpenM", data);
  // };

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
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Toolbar />
          <br />
          <h1 style={header}>Timetable</h1>
          <Dialog
            title="New Event"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <TextField
              ref="txtname"
              floatingLabelText="Name"
              hintText="Enter here..."
              maxLength="12"
              floatingLabelFixed={true}
              fullWidth={true}
              defaultValue={UserStore.currentValue}
            />{" "}
            <br />
          </Dialog>

          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn>Time</TableHeaderColumn>
                <TableHeaderColumn>Monday</TableHeaderColumn>
                <TableHeaderColumn>Tuesday</TableHeaderColumn>
                <TableHeaderColumn>Wednesday</TableHeaderColumn>
                <TableHeaderColumn>Thursday</TableHeaderColumn>
                <TableHeaderColumn>Friday</TableHeaderColumn>
                <TableHeaderColumn>Saturday</TableHeaderColumn>
                <TableHeaderColumn>Sunday</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {UserStore.obj.timetable.day.map((row, index) =>
                <TableRow key={index}>
                  <TableRowColumn className="eachRow">
                    {row.time}{" "}
                  </TableRowColumn>
                  <TableRowColumn className="eachRow">
                    {row.M}
                    <IconButton
                      tooltip="edit"
                      touch={true}
                      className="Morebutton"
                      onClick={this.handleOpenM.bind(this, row)}
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
                  </TableRowColumn>
                  <TableRowColumn className="eachRow">
                    {row.T}
                    <IconButton
                      tooltip="edit"
                      touch={true}
                      className="Morebutton"
                      onClick={this.handleOpenT.bind(this, row)}
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
                  </TableRowColumn>
                  <TableRowColumn className="eachRow">
                    {row.W}
                    <IconButton
                      tooltip="edit"
                      touch={true}
                      onClick={this.handleOpenW.bind(this, row)}
                      className="Morebutton"
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
                  </TableRowColumn>
                  <TableRowColumn className="eachRow">
                    {row.Th}
                    <IconButton
                      tooltip="edit"
                      className="Morebutton"
                      touch={true}
                      onClick={this.handleOpenTh.bind(this, row)}
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
                  </TableRowColumn>
                  <TableRowColumn className="eachRow">
                    {row.F}
                    <IconButton
                      tooltip="edit"
                      touch={true}
                      className="Morebutton"
                      onClick={this.handleOpenF.bind(this, row)}
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
                  </TableRowColumn>
                  <TableRowColumn className="eachRow">
                    {row.S}
                    <IconButton
                      tooltip="edit"
                      className="Morebutton"
                      touch={true}
                      onClick={this.handleOpenS.bind(this, row)}
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
                  </TableRowColumn>
                  <TableRowColumn className="eachRow">
                    {row.Su}
                    <IconButton
                      tooltip="edit"
                      touch={true}
                      onClick={this.handleOpenSu.bind(this, row)}
                      className="Morebutton"
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
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  }
}
