import React from 'react';

var {Link, IndexLink} = require("react-router");
import RaisedButton from 'material-ui/RaisedButton';
import {redirectVerify } from 'auth.js';

export default class Verify extends React.Component {
  
  constructor(props)
  {
    super(props);
    

  }
  state = {
  };


  render() {

    return (
      <div>
       <h2>Visit your Email to verify you account and then press OK.</h2>
<button onClick={redirectVerify}>sdfdfds</button>
            <IndexLink
              to="/app"
              activeClassName="active"
              activeStyle={{
              fontWeight: "bold"
            }}>
              Go to App
            </IndexLink>
</div>    );
  }
}

