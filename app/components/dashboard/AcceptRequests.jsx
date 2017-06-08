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
import SearchInput, { createFilter } from "react-search-input";
import Badge from 'material-ui/Badge';

// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import { observer } from "mobx-react";
import { Scrollbars } from 'react-custom-scrollbars';

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

let acceptrequests = [];
let acceptrequestscount;

const style = {
  margin: 12,
};
@observer
export default class AcceptRequests extends React.Component {
  constructor(props) {
    super(props);

        this.state = {
      searchTerm: " "
    };
    this._handleClick = this._handleClick.bind(this);  
  }

_handleClick(acceptrequests)
{
    console.log(acceptrequests.other_id)

var data = {
status: "friend",
id: acceptrequests.other_id
}
  $.ajax({
    type: 'POST',
    url: '/api/user/acceptrequestadd',
data: data
    })
  .done(function(data) {
// console.log(data)  

console.log(data);

})
  .fail(function(jqXhr) {
    console.log('failed to register');
  });

}


componentDidMount() {

// let userid = localStorage.getItem('userid');

   $.ajax({
    type: 'GET',
    url: '/api/user/acceptrequest'
    })
  .done(function(data) {
// console.log(data)  
acceptrequests = data;
FriendshipsStore.acceptrequests = data;
console.log("accept requests array");
console.log(data);
acceptrequestscount=Object.keys(acceptrequests).length;
console.log(acceptrequestscount);
FriendshipsStore.stateAcceptRequest = true;
FriendshipsStore.acceptrequestscount = acceptrequestscount;

})
  .fail(function(jqXhr) {
    console.log('failed to register');
  });

}

 searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
 
     const filteredEmails = acceptrequests.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
         return(
           
     

           <MuiThemeProvider muiTheme={muiTheme}>
            <div>
            <br></br>
             <div className="row">

      <div className="columns medium-8 large-8 small-centered">
<h3 style={header}>Accept Requests <Badge
      badgeContent={FriendshipsStore.acceptrequestscount}
      primary={true}
    /></h3>
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
   {acceptrequests.map(Acceptrequests => {
              return (
                <List key={Acceptrequests.user_id}>
     <ListItem
     key={Acceptrequests.user_id}
      disabled={true}
    
rightIconButton={<RaisedButton label={"Add " + Acceptrequests.other_id} primary={true} key={Acceptrequests.user_id} onTouchTap={() => this._handleClick(Acceptrequests)}
 style={style} />
}
>
    <div className="searchContent" key={Acceptrequests.user_id}>
                  <div className="subject">{Acceptrequests.status}</div>
                                    <br></br>
<div>                  {Acceptrequests.user_id} </div>
                  {Acceptrequests.status}
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
