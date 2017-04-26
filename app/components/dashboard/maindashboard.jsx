import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import muiThemeable from "material-ui/styles/muiThemeable";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
import TimeTable from "app/components/dashboard/timetable.jsx";
import Events from "app/components/dashboard/events.jsx";
import Main from "app/components/main.jsx";
import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";
import ListMessages from "app/components/listmessages.jsx";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { cyan500 } from "material-ui/styles/colors";
import { greenA400 } from "material-ui/styles/colors";
// import Store from "app/store/UIstore.js";
import axios from 'axios';

const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400
    //  primary3Color:greenA400,
    //   accent1Color: greenA400,
    //   accent2Color: greenA400,
    //   accent3Color: greenA400

    //this is for changing the theme
  },
  toggle: {
    thumbOnColor: "yellow",
    trackOnColor: "red",
    backgroundColor: "red"
  },
  appBar: {
    height: 50
  }
});

const style = {
  height: '100%',
}


// @observer
export default class MainDashboard extends React.Component {
  constructor(props) {
    super(props);
    // this.events = this.events.bind(this);
    // this.timetable = this.timetable.bind(this);
    // this.app = this.app.bind(this);


  }
componentDidMount () {

var profile= localStorage.getItem('profile');
var newprofile = JSON.parse(profile);
// console.log('new profile' + newprofile)
  // axios.get('/api/user', {
  // })
  // .then(function (response) {
  //   response=profile;
  //   console.log('respon')
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  $.ajax({
    type: 'POST',
    url: '/api/user',
    data: newprofile
  })
  .done(function(data) {
console.log('done' + profile)  })
  .fail(function(jqXhr) {
    console.log('failed to register');
  });

}

// GET request for remote imag

// axios.post('/api/user',
//  {
//   })
//   .then(function (response) {
//     response.body=profile;


//     console.log('respon')
//     console.log(response.body);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });






  render() {
Store.dashboard = true;
return(
    <MuiThemeProvider muiTheme={muiTheme}>

      <div style={style}>
        {/*<NewNav />*/}
        <Toolbar />

        {/*<FirstPage/>*/}

 <div>Heyyyyyyyyyyyyyyyyyyyyyyyyyyy</div>
      </div>
    </MuiThemeProvider>
);

  }
}
