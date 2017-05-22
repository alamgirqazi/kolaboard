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
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import FriendshipsStore from "app/store/FriendshipsStore.js";
import { observer } from "mobx-react";

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

const header = {
  textAlign: 'center',
};

let acceptrequests = [];

@observer
export default class AcceptRequests extends React.Component {
  constructor(props) {
    super(props);
  }

componentDidMount() {

// let userid = localStorage.getItem('userid');

   $.ajax({
    type: 'GET',
    url: '/api/user/acceptrequest'
    })
  .done(function(data) {
// console.log(data)  
acceptrequests = data;
FriendshipsStore.acceptrequests = data;
console.log("accept requests");
console.log(data);

})
  .fail(function(jqXhr) {
    console.log('failed to register');
  });

}



  render() {
         return(
           <MuiThemeProvider muiTheme={muiTheme}>
            <div>
            <br></br>
<h2 style={header}>Accept Requests</h2>

        </div> 
        </MuiThemeProvider>
);
  }
}
