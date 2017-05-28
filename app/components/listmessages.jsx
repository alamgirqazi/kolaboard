// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import MobileTearSheet from 'app/api/MobileTearSheet.js';
// import Badge from 'material-ui/Badge';
// import {List, ListItem, makeSelectable} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
// import FileFolder from 'material-ui/svg-icons/file/folder';
// import Subheader from 'material-ui/Subheader';
// import Avatar from 'material-ui/Avatar';
// import {grey400, darkBlack, lightBlack,blue300} from 'material-ui/styles/colors';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
// import Toolbar from 'Toolbar';
// import MenuItem from 'material-ui/MenuItem';
// var Infinite = require('react-infinite');
// import { Scrollbars } from 'react-custom-scrollbars';
// import Msgbar from 'app/components/toolbars/msgtoolbar.jsx';
// import UserStore from 'app/store/UserStore.js';
// import { observer } from "mobx-react";



// //NOT WORKING
// let SelectableList = makeSelectable(List);

// function wrapState(ComposedComponent) {
//   return class SelectableList extends Component {
//     static propTypes = {
//       children: PropTypes.node.isRequired,
//       defaultValue: PropTypes.number.isRequired,
//     };

//     componentWillMount() {
//       this.setState({
//         selectedIndex: this.props.defaultValue,
//       });
//     }

//     handleRequestChange = (event, index) => {
//       this.setState({
//         selectedIndex: index,
//       });
//     };

//     render() {
//       return (
//         <ComposedComponent
//           value={this.state.selectedIndex}
//           onChange={this.handleRequestChange}
//         >
//           {this.props.children}
//         </ComposedComponent>
//       );
//     }
//   };
// }

// SelectableList = wrapState(SelectableList);



// const iconButtonElement = (
//   <IconButton
//     touch={true}
//     tooltip="more"
//     tooltipPosition="bottom-left"
//   >
//     <MoreVertIcon color={grey400} />
//   </IconButton>
// );

// const rightIconMenu = (
//   <IconMenu iconButtonElement={iconButtonElement}>
//     <MenuItem>Reply</MenuItem>
//     <MenuItem>Delete</MenuItem>
//     <MenuItem>Details</MenuItem>
//   </IconMenu>
// );

// const style = {
//   height: '100%',
// }

// const ListMessages = () => (
//   <div className="margin" style={style}>
//     <MobileTearSheet>

// <Msgbar/>
// <input type="search" placeholder="Search Messages here....."/>
//              <Subheader>Today</Subheader>

// {/*style={{ height: 500 }}*/}
// {/*<Infinite containerHeight={500} elementHeight={4}>*/ }
//  {/*<Scrollbars  autoHeightMin={0} style={{ height: '100%' }}*/}
//  <Scrollbars  autoHeightMin={0} style={{ height: '100vh' }}
//         autoHeightMax={50}
//         thumbMinSize={50} >

//     <SelectableList defaultValue={3}>

//         <ListItem   value={4}
//             leftAvatar={
//         <Avatar
//           color={blue300}
//           backgroundColor={darkBlack}
//           size={40}
//         >
//         U         
//  <Badge   badgeContent={4}
//       primary={true}/>
//          </Avatar>
//       }
                
//        rightIconButton={rightIconMenu}
//           primaryText="Uni Group"
       
//           secondaryText={
//             <p>
//               <span style={{color: darkBlack}}>Seen WestWorld?</span><br />
//               I&apos;So in the finale we see Dolores 
//             </p>
//           }
//           secondaryTextLines={2}
//         />
//         <Divider inset={true} />
  
//         <br/>
//    <br/>        {UserStore.userrealname}
     
//    <br/>
//    <br/>
//    <br/>
//    <br/>

//         <br/>
//    <br/>
//    <br/>
//    <br/>
//    <br/>
//    <br/>
//    <br/>
//    <br/>

 
//            </SelectableList>

      
//   {/*</Infinite>*/}
//    </Scrollbars>

//     </MobileTearSheet>

//   </div>
// );

// export default ListMessages;

