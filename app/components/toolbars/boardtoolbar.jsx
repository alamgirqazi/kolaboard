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
import Drawer from 'app/components/drawer.jsx';

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

constructor(props) {
    super(props);
    this.state = {
      login: false,
      draweropen: false
    };

    this.handle= this
      .handle
      .bind(this);

  }

handle()
{
  this.setState({
    draweropen: !this.state.draweropen
  })
}

render(){
    return(
        <Toolbar>
      
 <ToolbarGroup >
          <ToolbarTitle text="Noteboard" />

      <IconButton tooltip="search..." touch={true} tooltipPosition="bottom-center" onClick={this.handle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>

            </IconButton>
</ToolbarGroup>



      <ToolbarGroup  lastChild={true} style={bottomPadding}>
          <ListItem 
            rightIconButton={rightIconMenu}   
          />
        </ToolbarGroup>
       {this.state.draweropen
              ? <Drawer/>
              : null
      }
      </Toolbar>

        );
        }
}