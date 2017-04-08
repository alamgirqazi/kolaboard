var React = require("react");
var ReactDOM = require("react-dom");
var { Route, Router, hashHistory,browserHistory, IndexRoute } = require("react-router");
var Main = require("Main");
import injectTapEventPlugin from "react-tap-event-plugin";
import FirstPage from "app/components/firstpage.jsx";
import { requireAuth } from 'auth.js';

//load foundation

require("style!css!foundation-sites/dist/foundation.min.css");

// app.scss

require("style!css!sass!applicationStyles");
require("style!css!sass!noteStyle");
require("style!css!sass!HomepageStyles");
require("style!css!sass!snowStyle");
require("style!css!sass!coreStyle");

$(document).foundation();
injectTapEventPlugin();

const NotFound = () => <h1>404.. This page is not found!</h1>;

ReactDOM.render(
  //Props passed
  // <Router history={hashHistory}>
  <Router history={browserHistory}>
    <Route path="/" component={FirstPage}> </Route>
    <Route path="/app" component={Main} onEnter={requireAuth}  />
  </Router>,
  document.getElementById("app")
);

    // <Route path="*" component={NotFound} />
//           <Route path="/special" component={Main} onEnter={requireAuth} />
  // <Route path="app" component={Main} onEnter={requireAuth}  />
