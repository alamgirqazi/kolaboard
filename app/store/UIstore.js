import mobx, { observable } from "mobx";

class Store {
  @observable full = "";
  @observable yum = true;
  @observable tabChange = true;
  @observable eventChange = true;

  @observable app = true;
  @observable timetable = false;
  @observable events = false;
  @observable dashboard = false;
  @observable privatenote = false;
  @observable invites = false;
  @observable chatdrawer = false;
  @observable newchatdrawer = false;
  @observable notedetails = false;
  @observable msgdetails = false;

  // @observable fullscreen = !
}

var store = (window.store = new Store());

export default store;
