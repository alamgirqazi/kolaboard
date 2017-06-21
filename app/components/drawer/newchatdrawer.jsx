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

const topStyle = {
  top: "60px"
};

// let friendlist = [];
// let friendlistcount;

@observer
export default class NewChatDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTerm: ""
    };
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

  //  componentDidMount() {

  //    $.ajax({
  //     type: 'GET',
  //     url: '/api/user/friendlist'
  //     })
  //   .done(function(data) {
  // friendlist = data;
  // console.log("meri friendlist");
  // console.log(data);
  // friendlistcount=Object.keys(friendlist).length;
  // FriendshipsStore.friendlistcount=friendlistcount;
  // console.log(friendlistcount);

  // })
  //   .fail(function(jqXhr) {
  //     console.log('friendlist mai msla');
  //   });

  //  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    // const filteredEmails = friendlist.filter(
    //   createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    // );

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
          />

        </Drawer>
      </div>
    );
  }
}
// <RaisedButton label="Open Drawer" onTouchTap={this.handleToggle} />

// between scroll bars

// {friendlist.map(Friendlist => {
//   return (
//     <List key={Friendlist.user_id}>
//       <ListItem
//         key={Friendlist.user_id}
//         disabled={true}
//         leftAvatar={<Avatar size={80} src={Friendlist.picture} />}
//       >
//         <div className="searchContent" key={Friendlist.other_id}>
//           <div className="subject">{Friendlist.other_id_name}</div>
//           <br />
//           <div>                  {Friendlist.other_id} </div>
//           {Friendlist.status}
//         </div>
//       </ListItem>
//     </List>
//   );
// })}

//    {acceptrequests.map(Acceptrequests => {
//               return (
//                 <List key={Acceptrequests.user_id}>
//      <ListItem
//      key={Acceptrequests.user_id}
//       disabled={true}

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
