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
  @observable unaddedFriends = [];
  @observable individualnote = [];
  @observable individualmsg = [];
  @observable favourites = [];
  @observable note = [];
  @observable mappingnotes = [];
  @observable readcount;
  @observable notescount;
  @observable folderId;
  @observable folderName;
  @observable editedNote;
  @observable noteId;

  @observable leaveinfo;
  @observable addUser;
  @observable removeUser;
  @observable totalnotescount;
  @observable totalmsgscount;
  @observable leavegroupname = "";
  @observable roomInfo;
  // @observable fullscreen = !
}

var chatstore = (window.chatstore = new ChatStore());

export default chatstore;
