var React = require("react");
var { Link, IndexLink } = require("react-router");
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import FirstPage from "app/components/firstpage.jsx";
import LoginDialog from "app/components/loginmodal.jsx";
import Nav from "app/components/nav.jsx";
import Toolbar from "app/components/toolbar.jsx";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import MainContainer from "app/components/MainContainer.jsx";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500, red500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: greenA400,
    accent1Color: red500
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
  height: "100%"
};

var Main = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={style}>
        <Toolbar />
        <MainContainer />
      </div>
    </MuiThemeProvider>
  );
};

module.exports = Main;
