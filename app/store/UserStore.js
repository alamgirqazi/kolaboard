import mobx, { computed, observable,extendObservable, autorun } from "mobx";

class UserStore {
  @observable todos = ["dont buy milk", "buy eggs"];
 @observable obj = {};
 @observable userrealname = '';
@observable allUsers;
@observable listy=false;
@observable flisty=false;




}

var userstore = (window.userstore = new UserStore());

export default userstore;

autorun(() => console.log(userstore.obj));
