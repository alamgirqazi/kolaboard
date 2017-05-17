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
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Scrollbars } from 'react-custom-scrollbars';

// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import SearchInput, { createFilter } from "react-search-input";
import emails from "app/components/dashboard/mail.js";
import FontIcon from 'material-ui/FontIcon';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


// const KEYS_TO_FILTERS = ["user.name", "subject", "dest.name"];
const KEYS_TO_FILTERS = ["email", "name", "nickname", "user_id"];


const style = {
  margin: 12,
};
const header = {
  textAlign: 'center',
};

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
export default class FindFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ""
    };
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  render() {
    const filteredEmails = emails.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>

   <div className="row">

      <div className="columns medium-8 large-8 small-centered">

<br></br>
          <h3 style={header}>Find Friends</h3>
<br></br>

          <div>
            <SearchInput
              className="search-input"
              onChange={this.searchUpdated.bind(this)}
            />
            <br></br>

   <Scrollbars
style={{height: 300 }}            renderTrackHorizontal={props => (
              <div
                {...props}
                className="track-horizontal"
                style={{ display: "none" }}
              />
            )}
            renderThumbHorizontal={props => (
              <div
                {...props}
                className="thumb-horizontal"
                style={{ display: "none" }}
              />
            )}
          >


            {filteredEmails.map(email => {
              return (
                <List>
                <div className="mail" key={email.user_id}>
        
     <ListItem
      disabled={true}
      leftAvatar={
        <Avatar size={80} src={email.picture} />

      }
          rightIconButton={    <RaisedButton label="Send Request" primary="true" style={style} />
}

    >
    <div className="searchContent">
                  <div className="subject">{email.name}</div>
                                    <br></br>
                  <div className="from">{email.email}</div>
                                    <br></br>

              <div className="subject">{email.identities[0].provider}</div> 

              </div>   

    </ListItem>

      </div>

                </List>
              );

            })}
     </Scrollbars>

          </div>

   </div>

      </div>

        </div>
      </MuiThemeProvider>
    );
  }
}
// <button>{email.name}</button>      
