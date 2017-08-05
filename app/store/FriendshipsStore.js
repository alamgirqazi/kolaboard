import mobx, { observable } from "mobx";

class FriendshipsStore {
  @observable acceptrequests = [];
  @observable stateAcceptRequest = false;

  @observable friendlistcount;
  @observable myfriendslist = [];
  @observable acceptrequestscount;
  @observable totalfriends = [];
  @observable acceptrequestsmap = [];
  @observable mylist = [];
  @observable findremovefriend;
  @observable removefriendlistfriend;

  @observable mappedFriends = [];

  // @observable fullscreen = !
}

var friendshipsstore = (window.friendshipsstore = new FriendshipsStore());

export default friendshipsstore;
