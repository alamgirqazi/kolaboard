import mobx, {observable} from 'mobx';

class Store  {

@observable todos = ["buy milk", "buy eggs"]
// @observable filter = "";
id = 6;

}

var store =  window.store = new Store 

export default store
