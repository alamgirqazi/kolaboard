var React = require('react');
var {Link, IndexLink} = require("react-router");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LoginModal from 'app/components/loginmodal.jsx';
import FirstPage from 'app/components/firstpage.jsx';


  var Nav = (props) =>
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
                     <RaisedButton label="Sign Up" primary={false}  labelColor="#FFF" style={style} backgroundColor="#00E676" />

         {/*<button onClick={this.func}>abcsaasd</button>*/}
         </li>
       
        </ul>    
      </div>
      <div className="top-bar-right">
    
       
       
       <ul className="menu">
 
         <li>
       {/*<input type="submit" name="" className="btnLogin button" value="Log In"/>*/}
                     <RaisedButton label="Log In" primary={true} className="btnLogin" onClick={handleClick}  backgroundColor="#3AAA35" >   </RaisedButton>

         </li>
       
       <li>
                     <RaisedButton label="Sign Up" primary={false} labelColor="#FFF" style={style} backgroundColor="#00E676" />

       </li>
 
       </ul>


    </div>



</div>
      </MuiThemeProvider>  
)
};
