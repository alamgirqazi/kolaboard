import mobx, { computed, observable,extendObservable, autorun } from "mobx";

class UserStore {
  @observable todos = ["dont buy milk", "buy eggs"];
 @observable obj = {picture: 'http://lorempixel.com/g/400/200'};
 @observable userrealname = '';
}

var userstore = (window.userstore = new UserStore());

export default userstore;

autorun(() => console.log(userstore.obj));
