import mobx, { observable } from "mobx";

class ChatStore {
  @observable groupname = " ";
  @observable groupavatar = " ";
  @observable admin_id = " ";
  @observable created_on = " ";
  @observable groupId = " ";
  @observable roomData = [];
  @observable msgs = [];
  @observable chipContent = [];
  @observable notes = [];
  @observable participants = [];
  @observable remainparticipants = [];
  @observable individualnote = [];
  @observable individualmsg = [];
  @observable favourites = [];
  @observable note = [];
  @observable readcount;
  @observable notescount;

  @observable leaveinfo;
  @observable leavegroupname = "";

  // @observable fullscreen = !
}

var chatstore = (window.chatstore = new ChatStore());

export default chatstore;
