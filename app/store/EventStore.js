import mobx, { observable } from "mobx";

class EventStore {
  @observable event = {};
}

var eventstore = (window.eventstore = new EventStore());

export default eventstore;
