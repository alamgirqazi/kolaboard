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
import { Scrollbars } from "react-custom-scrollbars";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";

const header = {
  textAlign: "center"
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

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpandChange = expanded => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    Store.events = true;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Toolbar />
          <Scrollbars
            autoHeightMin={0}
            style={{ height: "100vh" }}
            autoHeightMax={50}
            thumbMinSize={50}
          >
            <br />
            <h3 style={header}>Nearby Events</h3>
            <br />
            <br />

            <div className="row">
              <div className="col-xs-12 col-md-12 col-lg-12">
                <Card
                  expanded={this.state.expanded}
                  onExpandChange={this.handleExpandChange}
                >
                  <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    avatar="images/ok-128.jpg"
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText>
                    <Toggle
                      toggled={this.state.expanded}
                      onToggle={this.handleToggle}
                      labelPosition="right"
                      label="This toggle controls the expanded state of the component."
                    />
                  </CardText>
                  <CardMedia
                    expandable={true}
                    overlay={
                      <CardTitle
                        title="Overlay title"
                        subtitle="Overlay subtitle"
                      />
                    }
                  >
                    <img src="images/nature-600-337.jpg" alt="" />
                  </CardMedia>
                  <CardTitle
                    title="Card title"
                    subtitle="Card subtitle"
                    expandable={true}
                  />
                  <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                    facilisi. Donec vulputate interdum sollicitudin. Nunc
                    lacinia auctor quam sed pellentesque. Aliquam dui mauris,
                    mattis quis lacus id, pellentesque lobortis odio.
                  </CardText>
                  <CardActions>
                    <FlatButton label="Expand" onTouchTap={this.handleExpand} />
                    <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
                  </CardActions>
                </Card>

                <br />
                <br />

                <Card
                  expanded={this.state.expanded}
                  onExpandChange={this.handleExpandChange}
                >
                  <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    avatar="images/ok-128.jpg"
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText>
                    <Toggle
                      toggled={this.state.expanded}
                      onToggle={this.handleToggle}
                      labelPosition="right"
                      label="This toggle controls the expanded state of the component."
                    />
                  </CardText>
                  <CardMedia
                    expandable={true}
                    overlay={
                      <CardTitle
                        title="Overlay title"
                        subtitle="Overlay subtitle"
                      />
                    }
                  >
                    <img src="images/nature-600-337.jpg" alt="" />
                  </CardMedia>
                  <CardTitle
                    title="Card title"
                    subtitle="Card subtitle"
                    expandable={true}
                  />
                  <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                    facilisi. Donec vulputate interdum sollicitudin. Nunc
                    lacinia auctor quam sed pellentesque. Aliquam dui mauris,
                    mattis quis lacus id, pellentesque lobortis odio.
                  </CardText>
                  <CardActions>
                    <FlatButton label="Expand" onTouchTap={this.handleExpand} />
                    <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
                  </CardActions>
                </Card>
                <br />
                <br />
                <Card
                  expanded={this.state.expanded}
                  onExpandChange={this.handleExpandChange}
                >
                  <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    avatar="images/ok-128.jpg"
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText>
                    <Toggle
                      toggled={this.state.expanded}
                      onToggle={this.handleToggle}
                      labelPosition="right"
                      label="This toggle controls the expanded state of the component."
                    />
                  </CardText>
                  <CardMedia
                    expandable={true}
                    overlay={
                      <CardTitle
                        title="Overlay title"
                        subtitle="Overlay subtitle"
                      />
                    }
                  >
                    <img src="images/nature-600-337.jpg" alt="" />
                  </CardMedia>
                  <CardTitle
                    title="Card title"
                    subtitle="Card subtitle"
                    expandable={true}
                  />
                  <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                    facilisi. Donec vulputate interdum sollicitudin. Nunc
                    lacinia auctor quam sed pellentesque. Aliquam dui mauris,
                    mattis quis lacus id, pellentesque lobortis odio.
                  </CardText>
                  <CardActions>
                    <FlatButton label="Expand" onTouchTap={this.handleExpand} />
                    <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
                  </CardActions>
                </Card>
                <br />
                <br />
                <Card
                  expanded={this.state.expanded}
                  onExpandChange={this.handleExpandChange}
                >
                  <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    avatar="images/ok-128.jpg"
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText>
                    <Toggle
                      toggled={this.state.expanded}
                      onToggle={this.handleToggle}
                      labelPosition="right"
                      label="This toggle controls the expanded state of the component."
                    />
                  </CardText>
                  <CardMedia
                    expandable={true}
                    overlay={
                      <CardTitle
                        title="Overlay title"
                        subtitle="Overlay subtitle"
                      />
                    }
                  >
                    <img src="images/nature-600-337.jpg" alt="" />
                  </CardMedia>
                  <CardTitle
                    title="Card title"
                    subtitle="Card subtitle"
                    expandable={true}
                  />
                  <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                    facilisi. Donec vulputate interdum sollicitudin. Nunc
                    lacinia auctor quam sed pellentesque. Aliquam dui mauris,
                    mattis quis lacus id, pellentesque lobortis odio.
                  </CardText>
                  <CardActions>
                    <FlatButton label="Expand" onTouchTap={this.handleExpand} />
                    <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
                  </CardActions>
                </Card>
                <div>footer</div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </Scrollbars>
        </div>
      </MuiThemeProvider>
    );
  }
}
