import mobx, { computed, observable, extendObservable, autorun } from "mobx";

class UserStore {
  @observable todos = ["dont buy milk", "buy eggs"];
  @observable obj = {};
  @observable userrealname = "";
  @observable useraccount = "";
  @observable created_at = "";
  @observable created_at_day = "";
  @observable desc = "";
  @observable emailverified = false;
  @observable allUsers = [];
  @observable listy = false;
  @observable emailnotif = true;
  @observable flisty = false;
  @observable groupName;
  @observable currentFunction;
  @observable currentId;
  @observable currentValue;
}

var userstore = (window.userstore = new UserStore());

export default userstore;

// autorun(() => console.log(userstore.obj));
