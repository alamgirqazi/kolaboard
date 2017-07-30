import React from "react";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import ListChatContainer from "app/components/chat/ListChatContainer.jsx";
import NewChatDrawer from "app/components/drawer/newchatdrawer.jsx";
import ChatStore from "app/store/ChatStore.js";
import { observer } from "mobx-react";

const style = {
  height: "100%"
};
export default class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="fullWidth fullheight row expanded">
        <NewChatDrawer />
        <div className="columns medium-3 large-3 padding " style={style}>
          <ListChatContainer />
        </div>

        <div className="columns medium-4 large-4 padding" style={style}>
          <Chat />
        </div>

        <div className="columns medium-5 large-5 padding" style={style}>
          <Board />
        </div>
      </div>
    );
  }
}
