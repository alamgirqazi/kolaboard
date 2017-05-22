import mobx, { observable } from "mobx";

class FriendshipsStore {

  @observable acceptrequests = [];

  // @observable fullscreen = !
}

var friendshipsstore = (window.friendshipsstore = new FriendshipsStore());

export default friendshipsstore;
