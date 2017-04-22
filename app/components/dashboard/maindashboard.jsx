import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import muiThemeable from "material-ui/styles/muiThemeable";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
import TimeTable from "app/components/dashboard/timetable.jsx";
import Events from "app/components/dashboard/events.jsx";
import Main from "app/components/main.jsx";
import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";
import ListMessages from "app/components/listmessages.jsx";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";


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

const style = {
  height: '100%',
}


@observer
export default class MainDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.events = this.events.bind(this);
    this.timetable = this.timetable.bind(this);
    this.app = this.app.bind(this);


  }


  

  events(){
    return(
      <MuiThemeProvider>
            <div>
          <Toolbar />
          <Events />
        </div> 
        </MuiThemeProvider>
);
  }
  timetable(){
    return(
      <MuiThemeProvider>
            <div>
          <Toolbar />
          <TimeTable/>
        </div> 
        </MuiThemeProvider>
);
  }
  app(){
    return(
    <MuiThemeProvider muiTheme={muiTheme}>

      <div style={style}>
        {/*<NewNav />*/}
        <Toolbar />

        {/*<FirstPage/>*/}

        <div className="fullWidth fullheight row expanded">

          <div className="columns medium-3 large-3 padding " style={style}>
            <ListMessages />
          </div>

          <div className="columns medium-4 large-4 padding" style={style}>

            <Chat />
          </div>

          <div className="columns medium-5 large-5 padding" style={style}>
            <Board />
          </div>

        </div>
      </div>
    </MuiThemeProvider>
);
  }

  render() {
if(Store.app)
{console.log("app");
return this.app();}
else if(Store.timetable)
{console.log("TimeTable");
return this.timetable();}
else
{console.log("events")
return this.events();}
  }
}
