import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { greenA400 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: greenA400
  }
});

export default class SignupDialog extends React.Component {
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
