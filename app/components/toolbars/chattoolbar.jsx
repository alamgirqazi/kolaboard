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
import ActionGrade from 'material-ui/svg-icons/action/grade';

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

        <MenuItem>Group Info</MenuItem>
    <MenuItem>Clear Messages</MenuItem>
    <MenuItem>Delete Messages</MenuItem>
  </IconMenu>
);

const bottomPadding =
{
  paddingBottom: '12px',
}

// const style = 
// {
// left: '35%',
// };
const styleSearch = 
{
left: '20%',
};
export default class Chatbar extends React.Component{
render(){
    return(
        <Toolbar>        
        <ToolbarGroup firstChild={true}>
          <List>
        <ListItem
            leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        U
        </Avatar>
      }
          primaryText="Uni Group"
        />
        </List>
        </ToolbarGroup>


        {/*<ToolbarGroup>
      		<button><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z"/></svg></button>
         <button ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>

        </ToolbarGroup>*/}
      <ToolbarGroup style = {styleSearch}>
          <IconButton tooltip="search..." touch={true} tooltipPosition="bottom-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>

            </IconButton>
          <IconButton tooltip="add attachment" touch={true} tooltipPosition="bottom-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z"/></svg>

            </IconButton>
        </ToolbarGroup>

      <ToolbarGroup lastChild={true} style={bottomPadding}>
  
  
  {/*<IconButton tooltip="top-center" touch={true} tooltipPosition="top-center">
      <ActionGrade />
    </IconButton>*/}
          <ListItem 
            rightIconButton={rightIconMenu}   
          />
        </ToolbarGroup>
      
      
      </Toolbar>
        );
        }
}