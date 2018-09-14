import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const style = {
  width: "100%",
  display: "block",
  margin: "2%"
};
const modalstyle = {
  width: "75%",
  textAlign: "center",
  paddingLeft: "20%"
};
const stylefacebook = {
  width: "100%",
  display: "block",
  margin: "2%",
  backgroundColor: "#5499C7",
  color: "white"
};
const stylegmail = {
  width: "100%",
  display: "block",
  margin: "2%",
  backgroundColor: "#E74C3C",
  color: "white"
};

const muiTheme = getMuiTheme({
  palette: {}
});

export default class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false
  };

  handleOpen = () => {
    this.props.lock.show();
  };

  render() {
    const sty = {
      margin: 12
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <RaisedButton
            label={this.props.title}
            style={sty}
            primary={true}
            onTouchTap={this.handleOpen}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
