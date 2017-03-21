var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, hashHistory, IndexRoute} = require("react-router");
var Main = require("Main");
import injectTapEventPlugin from 'react-tap-event-plugin';
import FirstPage from 'app/components/firstpage.jsx'


//load foundation

require('style!css!foundation-sites/dist/foundation.min.css')

// app.scss

require('style!css!sass!applicationStyles')
require('style!css!sass!noteStyle')

$(document).foundation();
 injectTapEventPlugin();

ReactDOM.render(
  //Props passed
  <Router history={hashHistory}>
    <Route path="/" component={FirstPage}>
        <Route path="app" component={Main}></Route>
    </Route>
  </Router>,
  document.getElementById("app")
);
