var React = require("react");
var {Link, IndexLink} = require("react-router");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
var Nav = require('app/components/nav.jsx');
import FirstPage from 'app/components/firstpage.jsx';
import LeftSide from 'app/components/leftside.jsx';
import ListMessages from 'app/components/listmessages.jsx';
import LoginModal from 'app/components/loginmodal.jsx';
import NewNav from 'app/components/newnav.jsx';
import Toolbar from 'app/components/toolbar.jsx';

var Main = () =>
{
return (
       <MuiThemeProvider>

     <div>
  <Nav isLoggedIn={false}/>

{/*<FirstPage/>*/}
{/*<ListMessages/>*/}

 {/*<LeftSide/>*/}

<LoginModal/>

<Toolbar/>
<NewNav/>
 </div>
 </MuiThemeProvider>

  )};

module.exports = Main;

  


