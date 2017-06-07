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
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import { observer } from "mobx-react";
import { Scrollbars } from 'react-custom-scrollbars';

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

const style = {
  margin: 12,
};
@observer
export default class FriendList extends React.Component {
  constructor(props) {
    super(props);

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
// console.log(data)  
console.log("meri friendlist");
console.log(data);
})
  .fail(function(jqXhr) {
    console.log('friendlist mai msla');
  });

 }

  render() { 
         return(
           
     
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>   
            <h1>Friendlist</h1>
        </div> 
        </MuiThemeProvider>



);
  }
}
    //     <br></br>
//              <div className="row">

//       <div className="columns medium-8 large-8 small-centered">
// <h2 style={header}>Accept Requests</h2>

//                   <SearchInput
//               className="search-input"
//               onChange={this.searchUpdated.bind(this)}
//             />
//             <br></br>

//    <Scrollbars
// style={{height: 300 }}            renderTrackHorizontal={props => (
//               <div
//                 {...props}
//                 className="track-horizontal"
//                 style={{ display: "none" }}
//               />
//             )}
//             renderThumbHorizontal={props => (
//               <div
//                 {...props}
//                 className="thumb-horizontal"
//                 style={{ display: "none" }}
//               />
//             )}
//           >
//    {acceptrequests.map(Acceptrequests => {
//               return (
//                 <List key={Acceptrequests.user_id}>
//      <ListItem
//      key={Acceptrequests.user_id}
//       disabled={true}
//             <Avatar size={80} src={Acceptrequests.picture} />

// rightIconButton={<RaisedButton label={"Add " + Acceptrequests.other_id} primary={true} key={Acceptrequests.user_id} onTouchTap={() => this._handleClick(Acceptrequests)}
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
//                  </Scrollbars>

//           </div>

//    </div>
