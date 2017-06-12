import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import muiThemeable from "material-ui/styles/muiThemeable";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

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
import MenuItem from 'material-ui/MenuItem';
var Infinite = require('react-infinite');
import { Scrollbars } from 'react-custom-scrollbars';
import Msgbar from 'app/components/toolbars/msgtoolbar.jsx';
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
import TimeTable from "app/components/dashboard/timetable.jsx";
import Events from "app/components/dashboard/events.jsx";
import Main from "app/components/main.jsx";
import { observer } from "mobx-react";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
import UserStore from "app/store/UserStore.js";
import axios from 'axios';
import ChatStore from 'app/store/ChatStore.js'


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
      console.log('list clickedeed')
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
    var listmap;
let users = [];
// let otherusers = [];
let realusers = [];


@observer
export default class ListChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);  
    this.state = {
    };
      }

_handleClick(Users)
{
    console.log("listttt")
    alert('ok')
    console.log(Users.picture)
    ChatStore.groupavatar = Users.picture;
    ChatStore.groupname = Users.other_id_name;

    
}
componentDidMount() {

let userid = localStorage.getItem('userid');

//    $.ajax({
//     type: 'GET',
//     url: '/api/userall'
//     })
//   .done(function(data) {
// // console.log(data)  
// users = data;
// console.log("users");
// console.log(users);

// var index = users.findIndex(function(o){
//      return o.user_id ===userid;
// })
// users.splice(index, 1);

// UserStore.allUsers = users;
// UserStore.listy=true;
// })
//   .fail(function(jqXhr) {
//     console.log('failed to register');
//   });

 $.ajax({
    type: 'GET',
    url: '/api/user/friendlist'
    })
  .done(function(data) {
console.log("meri friendlist");
console.log(data);

users=data;
// otherusers=data.other_id;
// realusers=data.user_id;
UserStore.listy=true;

// var otherusers = new Map(data.map((i) => [i.other_id]));
// var otherusers = new Map(data.map((i) => [i.key, i.other_id]));

// var otherusers = data.map(function() {
//   return data.other_id;
// });
// console.log(otherusers)

//  $.ajax({
//     type: 'GET',
//     url: '/api/user/friendlistuser'
//     })
//   .done(function(data) {
// console.log(data);
// users=data;
// UserStore.listy=true;


// })
//   .fail(function(jqXhr) {
//     console.log('friendlist mai msla');
//   });



})
  .fail(function(jqXhr) {
    console.log('friendlist mai msla');
  });




}

  render() {
  

 const liststatus = UserStore.listy;


return(
 
 <div>
 
 <div className="margin" style={style}>
    <MobileTearSheet>

<Msgbar/>
<input type="search" placeholder="Search Messages here....."/>
             <Subheader>Today</Subheader>

 <Scrollbars  autoHeightMin={0} style={{ height: '100vh' }}
        autoHeightMax={50}
        thumbMinSize={50} >

  {liststatus ? (
           <div>
{users.map(Users => {
              return (
  
 <SelectableList defaultValue={3}>
                <div className="" key={Users.other_id}>

        <ListItem onTouchTap={() => this._handleClick(Users)}  value={4}
            leftAvatar={
        <Avatar
          size={40} src={Users.picture}
        >       
 <Badge   badgeContent={4}
      primary={true}/>
         </Avatar>
      }
                
       rightIconButton={rightIconMenu}
          primaryText={Users.other_id_name}
            
                 secondaryText={
            <p>
          This is some random text
            </p>
          }
          secondaryTextLines={2}
         
        />
      </div>


        <Divider inset={true} />
             </SelectableList>

              );

            })}
</div>
      ) : (
<div></div> 


      )} 


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



  {/*</Infinite>*/}
      </Scrollbars>

    </MobileTearSheet>

  </div>
); </div>
    
);

  }
}
