
import React from "react";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import ListChatContainer from 'app/components/chat/ListChatContainer.jsx';

const style = {
  height: '100%',
}
export default class MainContainer extends React.Component {
constructor(){
    super();
    this.state ={
    }
}
componentDidMount () {

var profile= localStorage.getItem('profile');
var newprofile = JSON.parse(profile);

  $.ajax({
    type: 'POST',
    url: '/api/user',
    data: newprofile
  })
  .done(function(data) {
console.log('done' + profile)  })
  .fail(function(jqXhr) {
    console.log('failed to register');
  });
}

  render() {
    return (
<div className="fullWidth fullheight row expanded">

          <div className="columns medium-3 large-3 padding " style={style}>
            <ListChatContainer />
          </div>

          <div className="columns medium-4 large-4 padding" style={style}>
            <Chat/>
          </div>

          <div className="columns medium-5 large-5 padding" style={style}>
            <Board />
          </div>

        </div>
    );
  }
}