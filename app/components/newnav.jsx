var React = require('react');
var {Link, IndexLink} = require("react-router");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LoginDialog from 'app/components/loginmodal.jsx';
import SignupDialog from 'app/components/signupmodal.jsx';
import FirstPage from 'app/components/firstpage.jsx';
import Drawer from 'app/components/drawer.jsx';
import muiThemeable from 'material-ui/styles/muiThemeable';

const greenbutton = {
  backgroundColor: "#00E676",

}

export default class NewNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      login: false
    };
    this.handleClick = this
      .handleClick
      .bind(this);

  }


  handleClick(e) {
    //  console.log('hello');
    this.setState({login: true});
    console.log(this.state.login);
    //  <FirstPage/>s
  }
   componentWillMount() {
var options = {
      languageDictionary: {
      emailInputPlaceholder: "something@youremail.com",
      title: "Log Me In"
    },
      // allowLogin: false,
      
      theme: {
      logo:'https://github.com/alamgirqazi/kolaboard/blob/master/public/Klogo.png',
      primaryColor: '#00E676',
      }
}

      this.lock = new Auth0Lock('a9sKTlJnoUuKXRLA9FvgmLnPe8BVywGM', 'alamgirqazi.auth0.com',options);
      // this.lock = new Auth0Lock('a9sKTlJnoUuKXRLA9FvgmLnPe8BVywGM', '5BZ51d58oDnkGSudOaDpCnhJfa7z5sn0EoLH_Jj6kMRvTfX5oJ2XuQKUFXLuEvKd',options);
      // this.lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_CLIENT_DOMAIN',options);


   }  
  render() {

    const style = {
      margin: 12,
    };

    const colormodal = 
    {
       backgroundColor: '#00E676'
    }

    return (
      <MuiThemeProvider>

        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                         <img src="Klogo.png"                   style={style}
/>

              </li>
              <li>
         
                {" "}
            <IndexLink
              to="/app"
              activeClassName="active"
              activeStyle={{
              fontWeight: "bold"
            }}>
              Go to App
            </IndexLink>
  

              </li>

            </ul>
          </div>
          <div className="top-bar-right">

            <ul className="menu">
<li>

<LoginDialog title = "Log In"  />


</li>

<li>
  <SignupDialog title="Sign Up" lock={this.lock} />
  
</li>
              {/*<li>
                <RaisedButton
                  label="Sign Up"
                  primary={false}
                  labelColor="#FFF"
                  style={style}
                  backgroundColor="#00E676"/>
              </li>*/}

            </ul>
          </div> 
 <div>

        {this.state.login
              ? <Drawer/>
              : null
}


 </div>
 </div>
      </MuiThemeProvider>

    );
  }
}
