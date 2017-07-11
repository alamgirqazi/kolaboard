import mobx, { observable } from "mobx";

class ChatStore {
  @observable groupname = " ";
  @observable groupavatar = " ";
  @observable groupId = " ";
  @observable roomData = [];
  @observable msgs = [];
  @observable chipContent = [];
  @observable notes = [];
  @observable participants = [];
  // @observable fullscreen = !
}

var chatstore = (window.chatstore = new ChatStore());

export default chatstore;
