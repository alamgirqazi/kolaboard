import decode from "jwt-decode";
import { browserHistory } from "react-router";
import Auth0Lock from "auth0-lock";
const ID_TOKEN_KEY = "id_token";
const everified = "ev";
const userid = "uid";
var emailverified;
var picture;
var user_id;
import userstore from "app/store/UserStore.js";

const lock = new Auth0Lock(
  "xDe229e1uR9PPKZMutFVk4QZYpAVU9l6",
  "kolaboard.auth0.com",
  {
    auth: {
      redirectUrl: `${window.location.origin}`,
      responseType: "token"
    }
  }
);

lock.on("authenticated", authResult => {
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
    userstore.obj = JSON.stringify(profile);

    user_id = profile["user_id"];
    emailverified = profile["email_verified"];
    picture = profile["picture"];

    localStorage.setItem("ev", emailverified);
    localStorage.setItem("userid", user_id);

    // Update DOM
    if (emailverified) {
      browserHistory.push("/app");
    } else {
      browserHistory.push("/verify");
    }
  });

  setIdToken(authResult.idToken);
});

export function login(options) {
  lock.show(options);

  return {
    hide() {
      lock.hide();
    }
  };
}

export function logout() {
  clearIdToken();
  clearLocalStorage();
  browserHistory.replace("/");
  location.reload();
}

export function redirectVerify(nextState, replace) {
  lock.on("authenticated", authResult => {
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) {
        return;
      }
      localStorage.setItem("profile", JSON.stringify(profile));
      emailverified = profile["email_verified"];
      localStorage.setItem("ev", emailverified);

      if (emailverified) {
        browserHistory.push("/app");
      }
    });
  });
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: "/" });
  }
}
export function redirect(nextState, replace) {
  var email = localStorage.getItem("ev");
  if (isLoggedIn() && email) {
    replace({ pathname: "/app" });
  }
}
export function requireVerification(nextState, replace) {
  emailverified = localStorage.getItem("ev");

  if (!emailverified && isLoggedIn()) {
  } else if (emailverified == "true" && isLoggedIn()) {
  } else {
    replace({ pathname: "/verify" });
  }
}

function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}
function clearLocalStorage() {
  localStorage.removeItem(userid);
  localStorage.removeItem(everified);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
