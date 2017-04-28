
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MobileTearSheet from 'app/api/MobileTearSheet.js';
import Badge from 'material-ui/Badge';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack,blue300} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import Toolbar from 'Toolbar';
import MenuItem from 'material-ui/MenuItem';
var Infinite = require('react-infinite');
import { Scrollbars } from 'react-custom-scrollbars';
import Msgbar from 'app/components/toolbars/msgtoolbar.jsx';


let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);



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
    <MenuItem>Delete</MenuItem>
    <MenuItem>Details</MenuItem>
  </IconMenu>
);

const style = {
  height: '100%',
}

// const ListMessages = () => (
//   <MobileTearSheet>
//     <SelectableList defaultValue={3}>
//       <Subheader>Selectable Contacts</Subheader>

//       <ListItem
//         value={3}
//         primaryText="Kerem Suer"
//         leftAvatar={<Avatar src="images/kerem-128.jpg" />}
//       />
//       <ListItem
//         value={4}
//         primaryText="Eric Hoffman"
//         leftAvatar={<Avatar src="images/kolage-128.jpg" />}
//       />
//       <ListItem
//         value={5}
//         primaryText="Raquel Parrado"
//         leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
//       />
//     </SelectableList>
//   </MobileTearSheet>
// );

// export default ListMessages;
// // height="100vh"
const ListMessages = () => (
  <div className="margin" style={style}>
    <MobileTearSheet>

<Msgbar/>
<input type="search" placeholder="Search Messages here....."/>
             <Subheader>Today</Subheader>

{/*style={{ height: 500 }}*/}
{/*<Infinite containerHeight={500} elementHeight={4}>*/ }
 {/*<Scrollbars  autoHeightMin={0} style={{ height: '100%' }}*/}
 <Scrollbars  autoHeightMin={0} style={{ height: '100vh' }}
        autoHeightMax={50}
        thumbMinSize={50} >

    <SelectableList defaultValue={3}>

        <ListItem   value={4}
            leftAvatar={
        <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        U     <Badge   badgeContent={4}
      primary={true}/>
         </Avatar>
      }
                
       rightIconButton={rightIconMenu}
          primaryText="Uni Group"
       
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Seen WestWorld?</span><br />
              I&apos;So in the finale we see Dolores 
            </p>
          }
          secondaryTextLines={2}
        />
   
                {/*<Badge   badgeContent={4}
      primary={true}/>*/}

        <Divider inset={true} />
        <ListItem   value={2}
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

                     <Badge   badgeContent={4}
      primary={true}/>
                <Badge   badgeContent={6}
      secondary={true}/>
       
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
          primaryText="Tahir Ali"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>hmmm</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem   value={3}
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
              <span style={{color: darkBlack}}>OKAY!</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem   value={1}
          leftAvatar={  <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        K
        </Avatar>}
          rightIconButton={rightIconMenu}
          primaryText="Brene Brown"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>The Gifts of Imperfection</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem   value={5}
          leftAvatar={  <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        M
        </Avatar>}
          rightIconButton={rightIconMenu}
          primaryText="Mark Manson"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>The Subtle Art</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem   value={6}
          leftAvatar={  <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        R
        </Avatar>}
          rightIconButton={rightIconMenu}
          primaryText="Ryan Holiday"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Ego is the Enemy</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <ListItem   value={8}
          leftAvatar={  <Avatar
          color={blue300}
          backgroundColor={darkBlack}
          size={40}
        >
        D
        </Avatar>}
          rightIconButton={rightIconMenu}
          primaryText="Daniel Kahnemann"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Thinking, Fast and Slow</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        

        <br/>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>
        <br/>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>

 
           </SelectableList>

      
  {/*</Infinite>*/}
   </Scrollbars>

    </MobileTearSheet>

  </div>
);

export default ListMessages;

