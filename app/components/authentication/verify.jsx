import React from 'react';

var {Link, IndexLink} = require("react-router");

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

