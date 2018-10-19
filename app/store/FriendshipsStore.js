import mobx, { observable } from "mobx";

class FriendshipsStore {
  @observable acceptrequests = [];
  @observable stateAcceptRequest = false;

  @observable friendlistcount = 0;
  @observable myfriendslist = [];
  @observable acceptrequestscount = 0;
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
