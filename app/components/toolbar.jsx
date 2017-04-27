import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack,blue300} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Menu, MenuItem} from 'material-ui/Menu';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
var {Link, IndexLink,browserHistory} = require("react-router");
import { logout, userProfile } from 'auth.js';
import {AppBar, Drawer} from 'material-ui';
import UserStore from "app/store/UserStore.js";
import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';


var localprofileparse;

// const backgroundhover = {
//   backgroundColor: 'E8E8E8',
// }

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
       open: false,
       obj: {}
    };
        this.showApp = this.showApp.bind(this);
    this.showEvents = this.showEvents.bind(this);
    this.showTimetable = this.showTimetable.bind(this);
    this.showDashboard = this.showDashboard.bind(this);
    this.showPrivateNotes = this.showPrivateNotes.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
 handleToggle = () => this.setState({ open: !this.state.open });
    

   showApp(){
    Store.app=true;
    Store.events=false;
    Store.timetable=false;
    Store.privatenote=false;
    Store.dashboard=false;
      browserHistory.replace("/app");

  }
  showTimetable(){
    Store.app=false;
    Store.events=false;
    Store.timetable=true;
      Store.privatenote=false;
    Store.dashboard=false;
      browserHistory.replace("/timetable");

  }
  showEvents(){
    Store.app=false;
    Store.events=true;
    Store.timetable=false;
      Store.privatenote=false;
    Store.dashboard=false;
  browserHistory.replace("/events");

  }
  showDashboard(){
    Store.app=false;
    Store.events=false;
    Store.timetable=false;
      Store.privatenote=false;
    Store.dashboard=true;
  browserHistory.replace("/dashboard");

  }
  showPrivateNotes(){
    Store.app=false;
    Store.events=false;
    Store.timetable=false;
      Store.privatenote=true;
    Store.dashboard=false;
  browserHistory.replace("/notes");

  }
//   appClick(){
//     if(Store.app == true)
// {
// var backgroundhover = {
//   backgroundColor: 'E8E8E8',
// }
// }
// else 
// {
// }

  //}
componentDidMount(){
      
$.ajax({
   url: 'api/user',
   data: {
      format: 'json'
   },
   error: function() {
     console.log('error in get');
   },
   dataType: 'json',
   success: function(data) { 
     
     UserStore.obj=data[0];
    //  console.log(UserStore.obj.picture)
    //  console.log(UserStore.obj.nickname)
    // nickname= UserStore.obj.nickname;
    //  console.log(UserStore.obj.name)
    // name= UserStore.obj.name;
    //  console.log(UserStore.obj.identities[0].provider)
    localprofileparse = UserStore.obj.identities[0].provider;     



if(localprofileparse=="facebook" || localprofileparse=="google-oauth2")
// if(localprofileparse.identities[0].provider=="facebook" || localprofileparse.identities[0].provider=="google-oauth2")

UserStore.userrealname = UserStore.obj.name;
else
UserStore.userrealname = UserStore.obj.nickname;

     },
   type: 'GET'
});




}

  handleChange = (event, index, value) => this.setState({value});

  render() {

// APP ROUTE

     if(Store.app == true)
{
var backgroundhover = {
  backgroundColor: '#E8E8E8',
}
}

else if ((Store.app == false)) {
 var backgroundhover = {
  backgroundColor: '#FFFFFF',
} 
}

// EVENTS ROUTE

     if(Store.events == true)
{
var backgroundhoverevents = {
  backgroundColor: '#E8E8E8',
}
}

else if ((Store.events == false)) {
 var backgroundhoverevents = {
  backgroundColor: '#FFFFFF',
} 
}

// TimeTable ROUTE

     if(Store.timetable == true)
{
var backgroundhovertimetable = {
  backgroundColor: '#E8E8E8',
}
}

else if ((Store.timetable == false)) {
 var backgroundhovertimetable = {
  backgroundColor: '#FFFFFF',
} 
}
// Private Notes ROUTE

     if(Store.privatenote == true)
{
var backgroundhoverprivatenote = {
  backgroundColor: '#E8E8E8',
}
}

else if ((Store.privatenote == false)) {
 var backgroundhoverprivatenote = {
  backgroundColor: '#FFFFFF',
} 
}
// Dashboard ROUTE

     if(Store.dashboard == true)
{
var backgroundhoverdashboard = {
  backgroundColor: '#E8E8E8',
}
}

else if ((Store.dashboard == false)) {
 var backgroundhoverdashboard = {
  backgroundColor: '#FFFFFF',
} 
}





    return (
      <div>
      <Toolbar style ={style}>
        <ToolbarGroup>
          
             <IconButton
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
        <Avatar src={UserStore.obj.picture} />
      }
          primaryText={UserStore.userrealname}
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



       <Drawer open={this.state.open} containerStyle={{ height: "100%" }}>
            <AppBar
              title="kolaboard"
              iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
            >
             </AppBar>

              <MenuItem style={backgroundhoverdashboard} onClick={this.showDashboard} primaryText="Dashboard" rightIcon={									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>								}> </MenuItem>
              <MenuItem style={backgroundhover} onClick={this.showApp} primaryText="Chat" rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>}> </MenuItem>
              <MenuItem style={backgroundhoverevents}  onTouchTap={this.showEvents} primaryText="Events" rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>}> </MenuItem>
              <MenuItem style={backgroundhovertimetable}  onTouchTap={this.showTimetable} primaryText="Timetable" rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>}> </MenuItem>
              <Divider />
              <MenuItem disabled={true}> </MenuItem>
              <MenuItem primaryText="Logout" > </MenuItem>

          </Drawer>
      </div>
    );
  }
}
              // <MenuItem style={backgroundhoverprivatenote} onClick={this.showPrivateNotes} primaryText="Private Notes" rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>}> </MenuItem>

            //     {" "}
            // <IndexLink  <Link to="/app">App</Link>
            //   to="/"
            //   activeClassName="active"
            //   activeStyle={{
            //   fontWeight: "bold"
            // }}>
            //   Go to App
            // </IndexLink>
