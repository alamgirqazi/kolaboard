import mobx, { observable } from "mobx";

class FriendshipsStore {
  @observable acceptrequests = [];
  @observable stateAcceptRequest = false;

  @observable friendlistcount;
  @observable myfriendslist = [];
  @observable acceptrequestscount;
  @observable totalfriends = [];

  // @observable fullscreen = !
}

var friendshipsstore = (window.friendshipsstore = new FriendshipsStore());

export default friendshipsstore;
