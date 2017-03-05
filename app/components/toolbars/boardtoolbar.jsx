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


// const style = {
//   // backgroundColor: '#D0E9EA',
//    backgroundColor: '#dcf8c6',
// }

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
    <MoreVertIcon color={darkBlack} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Settings</MenuItem>
    {/*<MenuItem></MenuItem>
    <MenuItem>Delete</MenuItem>*/}
  </IconMenu>
);


export default class Boardbar extends React.Component{
render(){
    return(
        <Toolbar>
        <ToolbarGroup>
          <List>
        <ListItem
        />
        </List>
        </ToolbarGroup>

      <ToolbarGroup  lastChild={true} style={bottomPadding}>
          <ListItem 
            rightIconButton={rightIconMenu}   
          />
        </ToolbarGroup>
      </Toolbar>
        );
        }
}