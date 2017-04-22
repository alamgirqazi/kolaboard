import mobx, { observable } from "mobx";

class Store {
  @observable todos = ["buy milk", "buy eggs"];

  // @observable filter = "";
  id = 6;

  @observable full = "";
@observable app=false;
@observable timetable=false;
@observable events=false;

  // @observable fullscreen = !
}

var store = (window.store = new Store());

export default store;
