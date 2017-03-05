import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack,blue300} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';

const styleSearch = 
{
left: '35%',
};

const bottomPadding =
{
  paddingBottom: '12px',
}
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>New Group</MenuItem>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuItem>Logout</MenuItem>
  </IconMenu>
);
// const style = 
// {
// left: '45%',
// };

export default class Msgbar extends React.Component{
render(){
    return(
        <Toolbar>
      <ToolbarGroup>
        </ToolbarGroup>
        <ToolbarGroup style={styleSearch}>
                  <IconButton tooltip="new group" touch={true} tooltipPosition="bottom-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
            </IconButton>
        
        </ToolbarGroup>
      <ToolbarGroup lastChild={true} style={bottomPadding}>
          <ListItem 
            rightIconButton={rightIconMenu}   
          />
        </ToolbarGroup>
      </Toolbar>
        );
        }
}