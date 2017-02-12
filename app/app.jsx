var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, hashHistory, IndexRoute} = require("react-router");
var Main = require("Main");
// import injectTapEventPlugin from 'react-tap-event-plugin';


//load foundation

require('style!css!foundation-sites/dist/foundation.min.css')

// app.scss

require('style!css!sass!applicationStyles')

$(document).foundation();
//injectTapEventPlugin();

ReactDOM.render(
  //Props passed
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    </Route>
  </Router>,
  document.getElementById("app")
);
