import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
// import PrivateNoteDrawer from 'app/components/drawer/privatenotedrawer.jsx';


//  const drawerwidth = {
//  width : '40%', 
//  }
//  const drawertop = {
//  top : '15%', 
//  }

export default class DrawerOpenRight extends React.Component {


  constructor(props) {
    super(props);
    this.state = {draweropen: true,  
      openingdrawer: this.props.drawerstate,
     };

this.handleToggle = this.handleToggle.bind(this);

  }




  handleToggle = () => 
  {
    // this.setState({draweropen: !this.state.openingdrawer})
this.setState((prevState, props) => ({
  draweropen: !prevState.draweropen,
 openingdrawer: !props.drawerstate

}));


}



  // handleToggle = () => this.setState({draweropen: !this.props.drawerstate()});

  render() {
    return (
      <div>
   

        <Drawer  width={'500'} openSecondary={true} open={this.state.draweropen} >
          <AppBar title="Private Notes" 

  iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}
           />


        </Drawer>


      </div>
    );
  }
}
