import React from "react";
import { AppBar, Drawer } from "material-ui";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import UIStore from "app/store/UIstore.js";
import { observer } from "mobx-react";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import { Scrollbars } from "react-custom-scrollbars";

import SearchInput, { createFilter } from "react-search-input";
import List from "material-ui/List/List";
import Avatar from "material-ui/Avatar";

import ListItem from "material-ui/List/ListItem";

const KEYS_TO_FILTERS = ["email", "name", "nickname", "user_id"];
import FriendshipsStore from "app/store/FriendshipsStore.js";
import Chip from "material-ui/Chip";
var Select = require("react-select");

const topStyle = {
  top: "60px"
};

let friendlist = [];
// let friendlistcount;

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

var options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two", clearableValue: false }
];
@observer
export default class NewChatDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTerm: ""
    };
    this.logChange = this.logChange.bind(this);
  }

  // handleToggle = () => this.setState({ open: !this.state.open });
  handleToggle = () => {
    UIStore.newchatdrawer = true;
  };
  handleCloseToggle = () => {
    UIStore.newchatdrawer = false;
  };

  handleClose = () => this.setState({ open: false });
  // Map Friendlist

  // Set Group Name
  createChip() {
    return (
      <Chip style={styles.chip}>
        <Avatar src="images/ok-128.jpg" />
        Deletable Avatar Chip
      </Chip>
    );
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/api/user/friendlist"
    })
      .done(function(data) {
        // friendlist = data;
        console.log("meri friendlist");
        console.log(data);

        console.log("aaaaaaaaa");

        // friendlistcount=Object.keys(friendlist).length;
        FriendshipsStore.totalfriends = data;
        friendlist = FriendshipsStore.totalfriends;

        // console.log(friendlistcount);
      })
      .fail(function(jqXhr) {
        console.log("friendlist mai msla");
      });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
  }

  render() {
    const filteredEmails = friendlist.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <div>
        <Drawer
          docked={true}
          width={350}
          style={topStyle}
          open={UIStore.newchatdrawer}
        >
          <AppBar
            title=""
            iconElementRight={
              <IconButton onTouchTap={this.handleCloseToggle}>
                <NavigationClose />
              </IconButton>
            }
          />

          <SearchInput
            className="search-input"
            onChange={this.searchUpdated.bind(this)}
          />

          <Scrollbars
            style={{ height: 300 }}
            renderTrackHorizontal={props =>
              <div
                {...props}
                className="track-horizontal"
                style={{ display: "none" }}
              />}
            renderThumbHorizontal={props =>
              <div
                {...props}
                className="thumb-horizontal"
                style={{ display: "none" }}
              />}
          >
            {friendlist.map(Friendlist => {
              return (
                <List key={Friendlist.user_id}>
                  <ListItem
                    onTouchTap={this.createChip}
                    key={Friendlist.user_id}
                    disabled={false}
                    leftAvatar={<Avatar size={40} src={Friendlist.picture} />}
                  >
                    <div className="searchContent" key={Friendlist.other_id}>
                      <div className="subject">
                        {Friendlist.other_id_name}
                      </div>
                      <br />
                      <div />
                    </div>
                  </ListItem>
                </List>
              );
            })}

            <Select
              name="form-field-name"
              value=""
              options={options}
              onChange={this.logChange}
            />
          </Scrollbars>
        </Drawer>
      </div>
    );
  }
}

// rightIconButton={<RaisedButton label={"Add"} primary={true} key={Acceptrequests.user_id} onTouchTap={() => this._handleClick(Acceptrequests)}
//  style={style} />
// }
// >
//     <div className="searchContent" key={Acceptrequests.user_id}>
//                   <div className="subject">{Acceptrequests.status}</div>
//                                     <br></br>
// <div>                  {Acceptrequests.user_id} </div>
//                   {Acceptrequests.status}
//               </div>
//     </ListItem>
//                 </List>
//               );
//             })}
