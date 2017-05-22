import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
// import RaisedButton from "material-ui/RaisedButton";
// import muiThemeable from "material-ui/styles/muiThemeable";
 import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import ListMessages from "app/components/listmessages.jsx";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import SvgIcon from 'material-ui/SvgIcon';


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

const plusBtn = {

  width: '48px',
  height: '48px',
}
const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};


const header = {
  textAlign: 'center',
};

const cardwidth = {
  width: '300px',
  margin: '10px',
  height: '300px',
}
const inlinedisplay = {
  display: 'flex',
}
const iconStyles = {
  // marginRight: 24,
marginLeft:'auto',
marginRight:'auto',


};
const HomeIcon = () => (
  <SvgIcon style={plusBtn}>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
 </SvgIcon>
);

export default class PrivateNotes extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    
    // Store.timetable = true;       
             return(
           
           <MuiThemeProvider muiTheme={muiTheme}>
            <div>
             <Toolbar />
             <br></br>
<h2 style={header}>Private Notes</h2>


             <br></br>
             <br></br>
             <br></br>
             <br></br>

<div style={inlinedisplay}>

 <Card  style={cardwidth} >
    <CardTitle title="Add New Note" subtitle="" />


          <IconButton       iconStyle={styles.largeIcon}
      style={styles.large}>

    <HomeIcon style={iconStyles} />
</IconButton>

  </Card>




 <Card style={cardwidth}>
  
    <CardTitle title="Private Note" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </CardText>
    <CardActions>
      <FlatButton label="Open" />
    </CardActions>
  </Card>
 <Card style={cardwidth}>
  
    <CardTitle title="University Stuff" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </CardText>
    <CardActions>
      <FlatButton label="Open" />
    </CardActions>
  </Card>
 <Card style={cardwidth}>
  
    <CardTitle title="Project" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </CardText>
    <CardActions>
      <FlatButton label="Open" />
    </CardActions>
  </Card>

 <Card style={cardwidth}>
  
    <CardTitle title="Project" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </CardText>
    <CardActions>
      <FlatButton label="Open" />
    </CardActions>
  </Card>

 <Card style={cardwidth}>
  
    <CardTitle title="Project" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </CardText>
    <CardActions>
      <FlatButton label="Open" />
    </CardActions>
  </Card>



</div>
        </div> 
</MuiThemeProvider>
         );
  }
}

//  <FlatButton
//       href="https://github.com/callemall/material-ui"
//       target="_blank"
//       secondary={true}
//       icon={<svg fill="#FFFFFF" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
//     <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
//     <path d="M0 0h24v24H0z" fill="none"/>
// </svg>}
//     />
      