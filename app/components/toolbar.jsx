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
var profilepic;
var nickname;

const style = {
// backgroundColor: '#D0E9EA',
backgroundColor: '$secondaryColor',
  // backgroundColor: '#dcf8c6',
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

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    console.log('asdasd')
var profileObject = userProfile();
	var profile = JSON.parse(profileObject);

console.log(profile.picture);

profilepic = profile.picture;

console.log('identity' + profile.identities.connection);
console.log('identity profile' + profile.identities[0].provider);

if(profile.identities[0].provider=="facebook")
nickname = profile.name;
else
nickname = profile.nickname;

    return (
      <Toolbar style ={style}>
        <ToolbarGroup>
            <li>
         
                {" "}
            <IndexLink
              to="/"
              activeClassName="active"
              activeStyle={{
              fontWeight: "bold"
            }}>
              Go to App
            </IndexLink>
  

              </li>
       </ToolbarGroup>
        <ToolbarGroup>

        <img src="Klogo.png"/>
        </ToolbarGroup>
        <ToolbarGroup>
       <ToolbarGroup firstChild={true}>
          <List>
        <ListItem

            leftAvatar={
        // <Avatar
        //   color={blue300}
        //   backgroundColor={darkBlack}
        //   size={40}
        // >
        // A
        // </Avatar>

        <Avatar src={profilepic} />
      }
          primaryText={nickname}
           />
        </List>
           <IconMenu
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
        </ToolbarGroup>

           </ToolbarGroup>
      </Toolbar>
    );
  }
}