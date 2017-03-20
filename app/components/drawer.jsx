import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

export default class DrawerOpenRight extends React.Component {


  constructor(props) {
    super(props);
    this.state = {open: false};
  }




  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer width={570} openSecondary={true} open={this.state.open} >
          <AppBar title="This is a drawer"

  iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}
     iconElementRight={<FlatButton label="Save" />}
           />


        </Drawer>
      </div>
    );
  }
}
              {/*onTitleTouchTap={this.handleToggle}*/}


//  {/*iconElementLeft={<IconButton><NavigationClose /></IconButton>}*/}
//     {/*iconElementRight={<FlatButton label="Save" />}*/}