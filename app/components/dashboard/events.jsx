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
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { greenA400, red500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import UserStore from "app/store/UserStore.js";
import EventStore from "app/store/EventStore.js";
import { observer } from "mobx-react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentFileUpload from "material-ui/svg-icons/file/file-upload";
import DatePicker from "material-ui/DatePicker";
import Snackbar from "material-ui/Snackbar";
import ActionHome from "material-ui/svg-icons/action/delete";
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

const spacing = {
  margin: 12
};
const tableDisplay = {
  display: "table"
};

const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400,
    //  primary3Color:greenA400,
    accent1Color: red500
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
  margin: 12,
  marginRight: 20
};
let theDate;
let totalEvents = [];
let data;
@observer
export default class Events extends React.Component {
  constructor(props) {
    super(props);

    EventStore.event = [{ title: "" }];
    this.state = {
      expanded: false,
      open: false,
      snackbaropen: false,
      openDelete: false
    };
  }

  handleExpandChange = expanded => {
    this.setState({ expanded: expanded });
  };
  handleTouchTap = () => {
    this.setState({ open: true, snackbaropen: false });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };
  handleSave = () => {
    var data = {
      title: this.refs.txtname.getValue(),
      description: this.refs.txtdesc.getValue(),
      date: theDate,
      user_name: UserStore.userrealname
    };

    console.log(data);
    $.ajax({
      type: "POST",
      url: "/api/user/createevent",
      data: data
    })
      .done(function(data) {
        alert("its all over");
      })
      .fail(function(jqXhr) {
        // console.log("failed to register POST REQ");
      });

    this.setState({ open: false, snackbaropen: true });
    $.ajax({
      type: "GET",
      url: "/api/getEvents"
    })
      .done(function(data) {
        console.log(data);
        EventStore.event = data;
        totalEvents = data;

        // users.splice(_.indexOf(users, _.findWhere(users, { uId : 117175967810648931400})), 1);
      })
      .fail(function(jqXhr) {
        console.log("failed to register");
      });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };
  // formatDate = (null,date) => {
  //   theDate = date;
  //   // theDate =
  //   //   date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  //   console.log(theDate);
  // };

  formatDate(e, date) {
    console.log(date);
    theDate = date;
    //   date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    // console.log(theDate);
  }

  handleReduce = () => {
    this.setState({ expanded: false });
  };
  mapEvent = () => {
    this.setState({ expanded: false });
  };
  handleToggle = () => {
    this.setState({
      openDelete: true
    });
  };
  handleDelete = event => {
    // alert(event._id);
    data = {
      _id: event._id
    };
    this.setState({
      openDelete: true,
      opensnackbar: false
    });
  };
  handleDeleteEvent = () => {
    $.ajax({
      type: "POST",
      url: "/api/deleteEvent",
      data: data
    })
      .done(function(data) {
        alert("its all over");
      })
      .fail(function(jqXhr) {
        // console.log("failed to register POST REQ");
      });
    this.setState({
      openDelete: false
    });
    $.ajax({
      type: "GET",
      url: "/api/getEvents"
    })
      .done(function(data) {
        console.log(data);
        EventStore.event = data;
        totalEvents = data;

        // users.splice(_.indexOf(users, _.findWhere(users, { uId : 117175967810648931400})), 1);
      })
      .fail(function(jqXhr) {
        console.log("failed to register");
      });
  };
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/api/getEvents"
    })
      .done(function(data) {
        console.log(data);
        EventStore.event = data;
        totalEvents = data;

        // users.splice(_.indexOf(users, _.findWhere(users, { uId : 117175967810648931400})), 1);
      })
      .fail(function(jqXhr) {
        console.log("failed to register");
      });
  }
  handleDeleteClose = () => {
    this.setState({ openDelete: false });
  };
  render() {
    totalEvents = EventStore.event;
    // Store.events = true;
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
    const actionsDelete = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleDeleteClose}
        style={style}
      />,
      <RaisedButton
        label="Delete Event"
        secondary={true}
        onTouchTap={this.handleDeleteEvent}
      />
    ];

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
            <Dialog
              title="Delete Event"
              actions={actionsDelete}
              modal={false}
              open={this.state.openDelete}
              onRequestClose={this.handleDeleteClose}
            >
              Are you sure you want to delete? This action cannot be reversed.
            </Dialog>
            <div className="row">
              <div className="col-xs-12 col-md-12 col-lg-12">
                {totalEvents.map(event => {
                  if (event.user_name == UserStore.userrealname) {
                    return (
                      <div>
                        <Card key={event._id}>
                          <h3>
                            {event.title}

                            <div className="pull-right">
                              <IconButton
                                secondary={true}
                                tooltip="Delete Event"
                                tooltipPosition="bottom-center"
                                onTouchTap={() => this.handleDelete(event)}
                              >
                                <ActionHome />
                              </IconButton>
                            </div>
                          </h3>

                          <CardHeader
                            title={event.description}
                            actAsExpander={true}
                            showExpandableButton={true}
                          />

                          <CardText expandable={true}>
                            <h5 className="pull-right">
                              {" "}{"Event Date: " + event.date}
                            </h5>
                            <h5 className="pull-left">
                              {"Created by: " + event.user_name}
                            </h5>
                          </CardText>
                        </Card>

                        <br />
                        <br />
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <Card key={event._id}>
                          <h3>
                            {event.title}
                          </h3>

                          <CardHeader
                            title={event.description}
                            actAsExpander={true}
                            showExpandableButton={true}
                          />

                          <CardText expandable={true}>
                            <h5 className="pull-right">
                              {" "}{"Event Date: " + event.date}
                            </h5>
                            <h5 className="pull-left">
                              {"Created by: " + event.user_name}
                            </h5>
                          </CardText>
                        </Card>

                        <br />
                        <br />
                      </div>
                    );
                  }
                })}

                <Snackbar
                  open={this.state.snackbaropen}
                  message="Event Created"
                  autoHideDuration={2500}
                  onRequestClose={this.handleRequestClose}
                />
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
                    hintText="Enter Event name here ..."
                    floatingLabelFixed={true}
                    fullWidth={true}
                  />{" "}
                  <TextField
                    ref="txtdesc"
                    floatingLabelText="Description"
                    hintText="Enter Event name here ..."
                    floatingLabelFixed={true}
                    fullWidth={true}
                  />{" "}
                  <DatePicker
                    ref="date"
                    hintText="Enter Event Date"
                    onChange={this.formatDate}
                  />
                  <input type="file" ref="file" multiple />
                  <br />
                </Dialog>
                <div className="fixedbutton">
                  <FloatingActionButton
                    style={style}
                    onTouchTap={this.handleTouchTap}
                    label="yo"
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                </div>

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
