
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
import { cyan500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400
    //   primary2Color: greenA400,
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

var Main = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>

      <div style={style}>
        {/*<NewNav />*/}
        <Toolbar />

        {/*<FirstPage/>*/}
        <MainContainer />
      </div>
    </MuiThemeProvider>
  );
};

module.exports = Main;