import React from 'react';
import MobileTearSheet from 'app/api/MobileTearSheet.js';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack,blue300} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
var Infinite = require('react-infinite');
import { Scrollbars } from 'react-custom-scrollbars';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const style = {
  height: '100%',
}

const ListMessages = () => (
  <div className="margin" style={style}>
    <MobileTearSheet height="100vh">
{/*style={{ height: 500 }}*/}
{/*<Infinite containerHeight={500} elementHeight={4}>*/ }
 <Scrollbars  autoHeightMin={0} style={{ height: '100%' }}
        autoHeightMax={50}
        thumbMinSize={50} >


<input type="search"/>
     
      <List style={style}>
        <Subheader>Today</Subheader>
        <ListItem
            leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        U
        </Avatar>
      } rightIconButton={rightIconMenu}
          primaryText="Umar Farooq"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
            leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        Q
        </Avatar>
      }
          rightIconButton={rightIconMenu}
          primaryText="Qamar Abbas"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Summer BBQ</span><br />
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
            leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        T
        </Avatar>
      }
          rightIconButton={rightIconMenu}
          primaryText="Tarique Ali"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Oui oui</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        K
        </Avatar>
      }
          rightIconButton={rightIconMenu}
          primaryText="Kolaboard"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={<Avatar>A</Avatar>}
          rightIconButton={rightIconMenu}
          primaryText="Abdul Majid"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        Z
        </Avatar>
      }
          
          rightIconButton={rightIconMenu}
          primaryText="Zeeshan"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        {/*<Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="http://lorempixel.com/g/400/200" />}
          rightIconButton={rightIconMenu}
          primaryText="Raquel Parrado"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Recipe to try</span><br />
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}
        />*/}
      </List>
  {/*</Infinite>*/}
   </Scrollbars>
    </MobileTearSheet>

  </div>
);

export default ListMessages;