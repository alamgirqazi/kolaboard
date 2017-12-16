import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Nav from "app/components/nav.jsx";
import Homepage from "app/components/homepage.jsx";
import { Scrollbars } from "react-custom-scrollbars";

var FirstPage = props => {
  return (
    <Scrollbars
      style={{ height: "100vh" }}
      renderTrackHorizontal={props => (
        <div
          {...props}
          className="track-horizontal"
          style={{ display: "none" }}
        />
      )}
      renderThumbHorizontal={props => (
        <div
          {...props}
          className="thumb-horizontal"
          style={{ display: "none" }}
        />
      )}
    >
      <Nav />
      <Homepage />
    </Scrollbars>
  );
};

export default FirstPage;
