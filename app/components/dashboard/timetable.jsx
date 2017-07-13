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
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
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
@observer
export default class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    socket = io.connect();

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: "300px"
    };
  }
  componentDidMount() {}
  render() {
    socket.emit("timetable", UserStore.obj.user_id);
    //Store.timetable = true;
    //Store.timetable = true;
    const tableData = [
      {
        name: "John Smith",
        status: "Employed"
      },
      {
        name: "Randal White",
        status: "Unemployed"
      },
      {
        name: "Stephanie Sanders",
        status: "Employed"
      },
      {
        name: "Steve Brown",
        status: "Employed"
      },
      {
        name: "Joyce Whitten",
        status: "Employed"
      },
      {
        name: "Samuel Roberts",
        status: "Employed"
      },
      {
        name: "Adam Moore",
        status: "Employed"
      }
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Toolbar />
          <br />
          <h1 style={header}>Timetable</h1>

          <div className="demo-info" style={topdiv}>
            <div className="demo-tip icon-tip">&nbsp;</div>
            <div>Click and drag a className to timetable.</div>
          </div>

          <div style={width}>
            <div className="right" />
          </div>

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
                <TableHeaderColumn
                  colSpan="3"
                  tooltip="Super Header"
                  style={{ textAlign: "center" }}
                >
                  Super Header
                </TableHeaderColumn>
              </TableRow>
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
              {tableData.map((row, index) =>
                <TableRow key={index}>
                  <TableRowColumn />
                  <TableRowColumn>
                    {row.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.status}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.status}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.status}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.status}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.status}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.status}
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

//$AV_ASW

//{tableData.map((row, index) =>
//     <TableRow key={index}>
//       <TableRowColumn>
//         {index}
//       </TableRowColumn>
//       <TableRowColumn>
//         {row.name}
//       </TableRowColumn>
//       <TableRowColumn>
//         {row.status}
//       </TableRowColumn>
//     </TableRow>
//   )}
//   <table>
//     <tr>
//       <td className="blank" />
//       <td className="title">Monday</td>
//       <td className="title">Tuesday</td>
//       <td className="title">Wednesday</td>
//       <td className="title">Thursday</td>
//       <td className="title">Friday</td>
//     </tr>
//     <tr>
//       <td className="time">08:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">09:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">10:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">11:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">12:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">13:00</td>
//       <td className="lunch" colspan="5">
//         Lunch
//       </td>
//     </tr>
//     <tr>
//       <td className="time">14:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">15:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">16:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">17:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">18:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">19:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//     <tr>
//       <td className="time">20:00</td>
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//       <td className="drop" />
//     </tr>
//   </table>
