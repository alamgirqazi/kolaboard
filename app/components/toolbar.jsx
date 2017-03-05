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
    return (
      <Toolbar style ={style}>
        <ToolbarGroup>

        <img src="Klogo.png"/>
        </ToolbarGroup>
        <ToolbarGroup>
       <ToolbarGroup firstChild={true}>
          <List>
        <ListItem

            leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        A
        </Avatar>
      }
          primaryText="Alam"
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
            <MenuItem primaryText="Log Out" />
          </IconMenu>
        </ToolbarGroup>

           </ToolbarGroup>
      </Toolbar>
    );
  }
}