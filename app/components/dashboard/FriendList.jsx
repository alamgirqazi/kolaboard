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
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import Badge from 'material-ui/Badge';

import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import UserStore from "app/store/UserStore.js";
import { observer } from "mobx-react";
import { Scrollbars } from 'react-custom-scrollbars';

import SearchInput, { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["email", "name", "nickname", "user_id"];

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

const header = {
  textAlign: 'center',
};




let friendlist = [];
let friendlistcount;
const style = {
  margin: 12,
};

@observer
export default class FriendList extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      searchTerm: ""
    };

//     this._handleClick = this._handleClick.bind(this);  
  }
// _handleClick(acceptrequests)
// {
//     console.log(acceptrequests.user_id)

// }

 componentDidMount() {

// // let userid = localStorage.getItem('userid');

   $.ajax({
    type: 'GET',
    url: '/api/user/friendlist'
    })
  .done(function(data) {
friendlist = data;
console.log("meri friendlist");
console.log(data);
friendlistcount=Object.keys(friendlist).length;
FriendshipsStore.friendlistcount=friendlistcount;
console.log(friendlistcount);

})
  .fail(function(jqXhr) {
    console.log('friendlist mai msla');
  });

 }
searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() { 

     const filteredEmails = friendlist.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
     );
         return(
           
     
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>           
             <br></br>
             <div className="row">

      <div className="columns medium-8 large-8 small-centered">
      <div>
<h3 style={header}>Friendlist   <Badge
      badgeContent={FriendshipsStore.friendlistcount}
      primary={true}
    /></h3>
 </div>
              <br></br>

                  <SearchInput
              className="search-input"
              onChange={this.searchUpdated.bind(this)}
            />
            <br></br>

   <Scrollbars
style={{height: 300 }}            renderTrackHorizontal={props => (
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
   {friendlist.map(Friendlist => {
              return (
                <List key={Friendlist.user_id}>
     <ListItem
     key={Friendlist.user_id}
      disabled={true}

>
    <div className="searchContent" key={Friendlist.user_id}>
                  <div className="subject">{Friendlist.status}</div>
                                    <br></br>
<div>                  {Friendlist.user_id} </div>
                  {Friendlist.status}
              </div>   
    </ListItem>
                </List>
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
   