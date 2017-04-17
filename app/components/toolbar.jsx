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

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
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
    );
  }
}