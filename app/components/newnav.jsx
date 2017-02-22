var React = require('react');
var {Link, IndexLink} = require("react-router");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LoginModal from 'app/components/loginmodal.jsx';
import FirstPage from 'app/components/firstpage.jsx';

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

  render() {

    const style = {
      margin: 12,
    };

    return (
      <MuiThemeProvider>

        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                <RaisedButton
                  label="Sign Up"
                  style={style}
                  primary={false}
                  onClick={this.handleClick}
                  labelColor="#FFF"
                  backgroundColor="#00E676"/>
              </li>

            </ul>
          </div>
          <div className="top-bar-right">

            <ul className="menu">

              <li>
                <RaisedButton
                  label="Log In"
                  primary={true}
                  style={style}
                  className="btnLogin"
                  backgroundColor="#3AAA35"></RaisedButton>

              </li>

              <li>
                <RaisedButton
                  label="Sign Up"
                  primary={false}
                  labelColor="#FFF"
                  style={style}
                  backgroundColor="#00E676"/>
              </li>

            </ul>
          </div> 
 <div>

        {this.state.login
              ? <LoginModal/>
              : null
}


 </div>
 </div>
      </MuiThemeProvider>

    );
  }
}
