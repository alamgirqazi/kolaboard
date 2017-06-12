import mobx, { observable } from "mobx";

class ChatStore {

@observable groupname;
@observable groupavatar;

  // @observable fullscreen = !
}

var chatstore = (window.chatstore = new ChatStore());

export default chatstore;
