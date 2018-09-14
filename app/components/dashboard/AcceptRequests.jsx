import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import SearchInput, { createFilter } from "react-search-input";
import Badge from "material-ui/Badge";
import Avatar from "material-ui/Avatar";
import UserStore from "app/store/UserStore.js";
import Snackbar from "material-ui/Snackbar";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import { observer } from "mobx-react";
import { Scrollbars } from "react-custom-scrollbars";

const KEYS_TO_FILTERS = ["email", "name", "nickname", "user_id"];

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

const header = {
  textAlign: "center"
};

let acceptrequests = [];
let acceptrequestscount;

const style = {
  margin: 12
};
@observer
export default class AcceptRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: " ",
      snackbarsendreq: false
    };
    this._handleClick = this._handleClick.bind(this);
  }
  handleRequestClose = () => {
    this.setState({ snackbarsendreq: false });
  };
  _handleClick(acceptrequests) {
    this.setState({
      snackbarsendreq: true
    });
    var data = {
      status: "friend",
      id: acceptrequests.other_id,
      uid: acceptrequests.user_id,
      user_id: UserStore.obj.user_id
    };
    $.ajax({
      type: "POST",
      url: "/api/user/acceptrequestadd",
      data: data
    })
      .done(function(data) {})
      .fail(function(jqXhr) {});

    $.ajax({
      type: "GET",
      url: "/api/user/friendlist"
    })
      .done(function(data) {
        FriendshipsStore.mylist = data;
        FriendshipsStore.friendlistcount = Object.keys(data).length;

        $.ajax({
          type: "GET",
          url: "/api/user/acceptrequest"
        })
          .done(function(data) {
            FriendshipsStore.acceptrequests = data;
            FriendshipsStore.acceptrequestscount = Object.keys(data).length;
            FriendshipsStore.stateAcceptRequest = true;
          })
          .fail(function(jqXhr) {});
      })
      .fail(function(jqXhr) {});
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/api/user/acceptrequest"
    })
      .done(function(data) {
        acceptrequests = data;
        FriendshipsStore.acceptrequests = data;

        acceptrequestscount = Object.keys(acceptrequests).length;
        FriendshipsStore.stateAcceptRequest = true;
        FriendshipsStore.acceptrequestscount = acceptrequestscount;
      })
      .fail(function(jqXhr) {});
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const filteredEmails = FriendshipsStore.acceptrequests.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <br />
          <div className="row">
            <div className="columns medium-8 large-8 small-centered">
              <h3 style={header}>
                Accept Requests{" "}
                <Badge
                  badgeContent={FriendshipsStore.acceptrequestscount}
                  primary={true}
                />
              </h3>
              <br />
              <Snackbar
                open={this.state.snackbarsendreq}
                message="Friend has been added"
                autoHideDuration={2500}
                onRequestClose={this.handleRequestClose}
              />
              <SearchInput
                className="search-input"
                onChange={this.searchUpdated.bind(this)}
              />
              <br />

              <Scrollbars
                style={{ height: 300 }}
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
                {filteredEmails.map(Acceptrequests => {
                  return (
                    <div className="mail">
                      <List key={Acceptrequests.user_id}>
                        <ListItem
                          key={Acceptrequests}
                          disabled={true}
                          leftAvatar={
                            <Avatar
                              size={80}
                              src={Acceptrequests.user_picture}
                            />
                          }
                          rightIconButton={
                            <RaisedButton
                              label={"Add Friend"}
                              primary={true}
                              key={Acceptrequests.user_id}
                              onTouchTap={() =>
                                this._handleClick(Acceptrequests)
                              }
                              style={style}
                            />
                          }
                        >
                          <div
                            className="searchContent"
                            key={Acceptrequests.user_id}
                          >
                            {Acceptrequests.user_id_name}
                            <div className="subjeccceptrequests.usert">
                              {Acceptrequests.status}
                            </div>
                            <br />
                            <div className="from">{}</div>
                            <br />
                            <div className="subject">{}</div>
                          </div>
                        </ListItem>
                      </List>
                    </div>
                  );
                })}
              </Scrollbars>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
