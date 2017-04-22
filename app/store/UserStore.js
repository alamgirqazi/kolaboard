import mobx, { computed, observable } from "mobx";

class UserStore {
  @observable todos = ["dont buy milk", "buy eggs"];
  obj = {};
}

var userstore = (window.userstore = new UserStore());

export default userstore;
