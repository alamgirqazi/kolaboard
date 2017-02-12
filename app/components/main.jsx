var React = require("react");
var {Link, IndexLink} = require("react-router");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

var Main = () =>
{
const style = {
  margin: 12,
};

return (
      <MuiThemeProvider>

    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          
          {/*<li className="menu-text">
            Kolaboard
            </li>
          */}

          
          <li>   

        <a href=""><img src="Klogo.png" alt="icon" className="alignnone size-full wp-image-156" /></a>
           </li>
        </ul>
      </div>
      <div className="top-bar-right">
    
       
       
       <ul className="menu">
         <li>
       {/*<input type="submit" name="" className="btnLogin button" value="Log In"/>*/}
                     <RaisedButton label="Log In" primary={true} className="btnLogin" backgroundColor="#3AAA35"   />

         </li>
       
       <li>
                     <RaisedButton label="Sign Up" primary={false} labelColor="#FFF" style={style} backgroundColor="#00E676" />

       </li>
       </ul>
    </div>

</div>
      </MuiThemeProvider>

  )};

module.exports = Main;

  


