import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import Auth0Lock from 'auth0-lock';
const ID_TOKEN_KEY = 'id_token';
var emailverified;

const lock = new Auth0Lock('xDe229e1uR9PPKZMutFVk4QZYpAVU9l6', 'kolaboard.auth0.com', {
    auth: {
        redirectUrl: `${window.location.origin}`,
        responseType: 'token'
    }
});

lock.on('authenticated', authResult => {
     lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    // localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
console.log(JSON.stringify(profile));

//Facebook
console.log(profile["email"]);
console.log(profile["name"]);
console.log(profile["picture"]);

    console.log(profile['email_verified']);
emailverified = profile['email_verified'];
    localStorage.setItem("emailverified", emailverified);

console.log('var email verified ' + emailverified);    
    // Update DOM
if(emailverified==true)
{
     browserHistory.push('/app');
 }
 else 
   {
     browserHistory.push('/verify');
 }

 });
  
  console.log('outside func' +emailverified);
    setIdToken(authResult.idToken);
    // browserHistory.push('#app');


    // browserHistory.push('/special');
});


export function login(options) {
    lock.show(options);

    return {
        hide() {
            lock.hide();
        }
    }
}

// export function logout() {
//     clearIdToken();
//     browserHistory.replace('/');
// }

export function requireAuth(nextState, replace) {

    if (!isLoggedIn()) {
        replace({ pathname: '/' });
    }
}
export function requireVerification(nextState, replace) {

// console.log('req veri');
// console.log('req veri ' + emailverified);
 emailverified = localStorage.getItem('emailverified');
    console.log('this shouldnt be undefined ' + emailverified);
   
   
   
    if (emailverified==true && isLoggedIn()){
         replace({ pathname: '/' });
        // browserHistory.push('/app');
    
}
    
    else
    {
    //  browserHistory.push('/verify');
            replace({ pathname: '/verify' });

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

export function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}