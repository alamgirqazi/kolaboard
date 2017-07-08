import mobx, { observable } from "mobx";

class EventStore {
  @observable event = {};
  //   @observable groupavatar = " ";
  //   @observable groupId = " ";
  //   @observable roomData = [];
  //   @observable msgs = [];

  // @observable fullscreen = !
}

var eventstore = (window.eventstore = new EventStore());

export default eventstore;
