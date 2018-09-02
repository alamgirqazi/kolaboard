var React = require("react");
var ReactDOM = require("react-dom");
var {
  Route,
  Router,
  hashHistory,
  browserHistory,
  IndexRoute
} = require("react-router");
var Main = require("Main");
import injectTapEventPlugin from "react-tap-event-plugin";
import FirstPage from "app/components/firstpage.jsx";
import Verify from "app/components/authentication/verify.jsx";
import { requireAuth, requireVerification, redirect } from "./api/auth.js";
import NotFound from "app/components/dashboard/NotFound.jsx";
import TimeTable from "app/components/dashboard/timetable.jsx";
import Settings from "app/components/dashboard/settings.jsx";
import Profile from "app/components/dashboard/profile.jsx";
import PrivateNotes from "app/components/dashboard/privatenotes.jsx";
import Events from "app/components/dashboard/events.jsx";
import Store from "app/store/UIstore.js";
import Invites from "app/components/dashboard/invites.jsx";
import MainContainer from "app/components/MainContainer.jsx";
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

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={FirstPage} onEnter={redirect}>
      {" "}
    </Route>
    <Route path="/app" component={Main} onEnter={requireVerification} />
    <Route path="/timetable" component={TimeTable} />
    <Route path="/events" component={Events} />
    <Route path="/notes" component={PrivateNotes} />
    <Route path="/settings" component={Settings} />
    <Route path="/profile" component={Profile} />
    <Route path="/invites" component={Invites} />

    <Route path="/verify" component={Verify} onEnter={requireAuth} />
    <Route path="*" component={NotFound} />
  </Router>,
  document.getElementById("app")
);
