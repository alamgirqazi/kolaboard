// import React from 'react';
// import IconMenu from 'material-ui/IconMenu';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import {grey400, darkBlack, lightBlack,blue300} from 'material-ui/styles/colors';
// import {List, ListItem} from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
// import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
// import MenuItem from 'material-ui/MenuItem';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import RaisedButton from 'material-ui/RaisedButton';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// var {Link, IndexLink} = require("react-router");
// import { logout, userProfile } from 'auth.js';
// var profilepic;
// var nickname;

// const style = {
// // backgroundColor: '#D0E9EA',
// backgroundColor: '$secondaryColor',
//   // backgroundColor: '#dcf8c6',
// }
// const leftmost = 
// {
//   marginLeft: 0,
// }

// const paddingIcon={
//   paddingBottom: '48px',
// }
// const iconButtonElement = (
//   <IconButton style={paddingIcon}
//     touch={true}
//     tooltip="more"
//     tooltipPosition="bottom-left"
//   >
//     <MoreVertIcon color={darkBlack} />
//   </IconButton>
// );
// const rightIconMenu = (
//   <IconMenu style={paddingIcon} iconButtonElement={iconButtonElement}>
//     <MenuItem>Reply</MenuItem>
//     <MenuItem>Forward</MenuItem>
//     <MenuItem>Delete</MenuItem>
//   </IconMenu>
// );

// export default class ToolbarExamplesSimple extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 3,
//     };
//   }

// componentDidMount(){
// }

//   handleChange = (event, index, value) => this.setState({value});

//   render() {

// // var profileObject = userProfile();
//  var localprofile = localStorage.getItem('profile');
// 	var localprofileparse = JSON.parse(localprofile);
// 	//  var profile = JSON.parse(profileObject);

// // console.log(profile.picture);
// console.log('profile parsed');
// console.log(localprofileparse);

// profilepic = localprofileparse.picture;
// console.log(profilepic+ 'asd');
// console.log(nickname)
// if(localprofileparse.identities[0].provider=="facebook" || localprofileparse.identities[0].provider=="google-oauth2")
// nickname = localprofileparse.name;
// else
// nickname = localprofileparse.nickname;
  

//     return (
//       <Toostorelbar style ={style}>
//         <ToolbarGroup>
//             <li>
         
//                 {" "}
//             <IndexLink
//               to="/"
//               activeClassName="active"
//               activeStyle={{
//               fontWeight: "bold"
//             }}>
//               Go to App
//             </IndexLink>
  

//               </li>
//        </ToolbarGroup>
//         <ToolbarGroup>

//         <img src="Klogo.png"/>
//         </ToolbarGroup>
//         <ToolbarGroup>
//        <ToolbarGroup firstChild={true}>
//           <List>
//         <ListItem disabled={true}

//             leftAvatar={
//         <Avatar src={profilepic} />
//       }
//           primaryText={nickname}
//            />
//         </List>
//         <div className="leftmostlogout">
//            <IconMenu style={leftmost}
//             iconButtonElement={
//               <IconButton touch={true}>
//                 <NavigationExpandMoreIcon />
//               </IconButton>
//             }
//           >
//             <MenuItem primaryText="Profile" />
//             <MenuItem primaryText="Settings" />
//             <MenuItem primaryText="Log Out" onClick = {logout}/>
//           </IconMenu>
//      </div>
//         </ToolbarGroup>

//            </ToolbarGroup>
//       </Toostorelbar>
//     );
//   }
// }

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack,blue300} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
var {Link, IndexLink} = require("react-router");
import { logout, userProfile } from 'auth.js';
import {AppBar, Drawer} from 'material-ui';
import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";
import NavigationClose from 'material-ui/svg-icons/navigation/close';

var profilepic;
var nickname;

const style = {
// backgroundColor: '#D0E9EA',
backgroundColor: '$secondaryColor',
  // backgroundColor: '#dcf8c6',
}
const leftmost = 
{
  marginLeft: 0,
}

const paddingIcon={
  paddingBottom: '48px',
}
const iconButtonElement = (
  <IconButton style={paddingIcon}
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={darkBlack} />
  </IconButton>
);
const rightIconMenu = (
  <IconMenu style={paddingIcon} iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);
const menuStyle = {
  height:"20px",
  width:"20px"
}
@observer
export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
       open: false
    };
        this.showApp = this.showApp.bind(this);
    this.showEvents = this.showEvents.bind(this);
    this.showTimetable = this.showTimetable.bind(this);
  }
 handleToggle = () => this.setState({ open: !this.state.open });
    showApp(){
    Store.app=true;
    Store.events=false;
    Store.timetable=false;
  }
  showTimetable(){
    Store.app=false;
    Store.events=false;
    Store.timetable=true;
  }
  showEvents(){
    Store.app=false;
    Store.events=true;
    Store.timetable=false;
  }
componentDidMount(){
}

  handleChange = (event, index, value) => this.setState({value});

  render() {

// var profileObject = userProfile();
 var localprofile = localStorage.getItem('profile');
	var localprofileparse = JSON.parse(localprofile);
	//  var profile = JSON.parse(profileObject);

// console.log(profile.picture);
console.log('profile parsed');
console.log(localprofileparse);

profilepic = localprofileparse.picture;
console.log(profilepic+ 'asd');
console.log(nickname)
if(localprofileparse.identities[0].provider=="facebook" || localprofileparse.identities[0].provider=="google-oauth2")
nickname = localprofileparse.name;
else
nickname = localprofileparse.nickname;
  

    return (
      <div>
      <Toolbar style ={style}>
        <ToolbarGroup>
         
<IconButton
            tooltip="expand"
            touch={true}
            tooltipPosition="bottom-center"
            onClick={this.handleToggle}
          >
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 18 18"><path d="M2 13.5h14V12H2v1.5zm0-4h14V8H2v1.5zM2 4v1.5h14V4H2z"/></svg>

          </IconButton>
       </ToolbarGroup>
        <ToolbarGroup>

        <img src="Klogo.png"/>
        </ToolbarGroup>
        <ToolbarGroup>
       <ToolbarGroup firstChild={true}>
          <List>
        <ListItem disabled={true}

            leftAvatar={
        <Avatar src={profilepic} />
      }
          primaryText={nickname}
           />
        </List>
        <div className="leftmostlogout">
           <IconMenu style={leftmost}
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Profile" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Log Out" onClick = {logout}/>
          </IconMenu>
     </div>
        </ToolbarGroup>

           </ToolbarGroup>
      </Toolbar>
       <Drawer open={this.state.open} containerStyle={{ height: "100%" } }>
            <AppBar
              title="kolaboard"



              iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
            >
             </AppBar>
              <MenuItem onClick={this.showApp}>App</MenuItem>
               <MenuItem onClick={this.showTimetable}>Time Table</MenuItem>
              <MenuItem onClick={this.showEvents}>Events</MenuItem>
          </Drawer>
      </div>
    );
  }
}
            //     {" "}
            // <IndexLink
            //   to="/"
            //   activeClassName="active"
            //   activeStyle={{
            //   fontWeight: "bold"
            // }}>
            //   Go to App
            // </IndexLink>
//                 //  <button  onClick={this.handleToggle}><img src="menu.png" style={menuStyle}/></button>  
