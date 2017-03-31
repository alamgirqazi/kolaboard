import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import ReactQuill from 'react-quill';
// import PrivateNoteDrawer from 'app/components/drawer/privatenotedrawer.jsx';
import { Scrollbars } from 'react-custom-scrollbars';


//  const drawerwidth = {
//  width : '40%', 
//  }
 const overflowy = {
   overflowY: 'none',

 }

 
 const bottom = {
   bottom: '0px',

 }

 
 


export default class DrawerOpenRight extends React.Component {


  constructor(props) {
    super(props);
    this.state = {draweropen: true,  
      openingdrawer: this.props.drawerstate,
     };

this.handleToggle = this.handleToggle.bind(this);
this.handleChange = this.handleChange.bind(this);

  }

 modules= {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image']
    ]
  };
 
  formats= [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',  
    'link', 'image'
  ];


  handleToggle = () => 
  {
    // this.setState({draweropen: !this.state.openingdrawer})
this.setState((prevState, props) => ({
  draweropen: !prevState.draweropen,
 openingdrawer: !prevState.drawerstate,
   text: '' 
//   draweropen: !prevState.draweropen,
//  openingdrawer: !props.drawerstate

}));


}

 handleChange(value) {
    this.setState({ text: value })
  }

  // handleToggle = () => this.setState({draweropen: !this.props.drawerstate()});

  render() {
    return (
      <div style={overflowy}>
 


        <Drawer  width={500} openSecondary={true} open={this.state.draweropen} >
          <AppBar title="Private Notes" 
  iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}
           />
{/*style={{ height: '100vh' }}*/}
              {/*<Scrollbars  
        thumbMinSize={50} >*/}

      <ReactQuill  value={this.state.text} theme="snow" style={bottom}
                  onChange={this.handleChange}   modules={this.modules} placeholder={'Write something'}
                    formats={this.formats} />

{/*</Scrollbars >*/}
        </Drawer>

      </div>
    );
  }
}
