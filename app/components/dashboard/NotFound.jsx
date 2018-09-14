import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { greenA400 } from "material-ui/styles/colors";

import { browserHistory } from "react-router";

const tableDisplay = {
  display: "table"
};
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: greenA400
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
const style2 = {
  margin: 12
};

const header = {
  textAlign: "center"
};

// @observer
export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    browserHistory.replace("/");
    location.reload();
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <br />
          <div className="row fullwidth">
            <div className="columns medium-12 large-12">
              <Card>
                <CardTitle title="404 Error" />
                <br />
                <div className="center-block" style={{ display: "table" }}>
                  <img src="Klogo.png" style={style2} />
                </div>
                <br />
                <CardText>
                  <h2>
                    {" "}
                    Oops… looks like something went wrong! This page does<br />
                    not exist or has been moved.
                  </h2>
                  <br />
                  <br />
                  <div
                    className="center-block"
                    style={{ display: "table", height: "50px" }}
                  >
                    <RaisedButton
                      className="center-block"
                      label={"Visit Our Homepage"}
                      primary={true}
                      style={tableDisplay}
                      onTouchTap={() => this.handleClick()}
                      style={style}
                    />
                    <br />
                  </div>
                </CardText>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Card>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
