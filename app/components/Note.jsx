import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Snackbar from "material-ui/Snackbar";
var dragula = require("react-dragula");
import Linkifier from "react-linkifier";
import { Scrollbars } from "react-custom-scrollbars";
import ChatStore from "app/store/ChatStore.js";
import { observer } from "mobx-react";
import UserStore from "app/store/UserStore.js";
import UIStore from "app/store/UIstore.js";
import ContentMore from "material-ui/svg-icons/navigation/expand-more";
import ActionDelete from "material-ui/svg-icons/action/delete";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import { List, ListItem } from "material-ui/List";
let individualnotes;
const wordwrap = {
  wordWrap: "breakWord",
  overflow: "hidden"
};

const savebtn = {
  bottom: "1px"
};
const noteName = {
  fontSize: "0.7rem",
  left: "0",
  bottom: "15px",
  color: "#777",
  position: "absolute"
};
const pinstyle = {
  width: "22px",
  height: "22px",
  margin: "0 50px",
  display: "inline-block",
  transform: "rotate(330deg)"
};
const customContentStyle = {
  width: "30%",
  maxWidth: "none"
};
var socket;
const style = {
  margin: 12,
  marginRight: 20
};
@observer
class Note extends React.Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      openDialog: false
    };

    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.details = this.details.bind(this);
  }

  edit() {
    this.setState({
      editing: true,
      open: false
    });
  }

  save() {
    socket = io.connect();
    var data = {
      newnote: this.refs.newText.value,
      _id: this.props.children._id,
      roomId: ChatStore.groupId
    };
    socket.emit("individualnote edit", data);
    this.props.children.text = data.newnote;
    this.setState({
      editing: false,
      open: false
    });
  }
  details() {
    UIStore.notedetails = true;
    //console.log(this.props.children);
    ChatStore.individualnote = this.props.children;
    //individualnotes = this.props.children;
  }
  remove() {
    var data = {
      _id: this.props.children._id,
      roomId: ChatStore.groupId
    };
    socket.emit("note delete", data);

    socket.on("remainingnotes", function(data) {
      console.log("da");
      console.log(data[0].notes);
      // var a = data[0].from;
      // console.log(data[0].from);
      // b = a.split(/\s(.+)/)[0]; //everything before the first space
      // data.firstname = b;
      ChatStore.notes = data[0].notes;
    });
    // this.props.onRemove(this.props.index);
  }

  renderDisplay() {
    if (this.props.children.from == UserStore.userrealname) {
      return (
        <div className="">
          <div
            className="note"
            style={{ backgroundColor: this.props.children.color }}
          >
            <div className="" style={{ display: "inline" }}>
              {" "}<img
                style={{ display: "inline-block", margin: "0 30px" }}
                src="assets/images/pin-icon.png"
                style={pinstyle}
              />
              <IconMenu
                iconButtonElement={
                  <IconButton
                    style={{
                      display: "inline",
                      float: "right",
                      width: "22px",
                      height: "22px",
                      padding: "0px"
                    }}
                    tooltip="more"
                    touch={true}
                    tooltipPosition="bottom-center"
                  >
                    <ContentMore />
                  </IconButton>
                }
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                targetOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem primaryText="Edit" onTouchTap={this.edit} />
                <MenuItem primaryText="Delete" onTouchTap={this.remove} />
                <MenuItem primaryText="Details" onTouchTap={this.details} />
              </IconMenu>
            </div>
            <Scrollbars
              autoHeightMax={20}
              renderTrackHorizontal={props =>
                <div
                  {...props}
                  className="track-horizontal"
                  style={{ display: "none" }}
                />}
              renderThumbHorizontal={props =>
                <div
                  {...props}
                  className="thumb-horizontal"
                  style={{ display: "none" }}
                />}
            >
              <p style={{ backgroundColor: this.props.children.color }}>
                <Linkifier>
                  {this.props.children.text}
                </Linkifier>
              </p>
            </Scrollbars>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <div
            className="note"
            style={{ backgroundColor: this.props.children.color }}
          >
            <div className="" style={{ display: "inline" }}>
              {" "}<img
                style={{ display: "inline-block", margin: "0 30px" }}
                src="assets/images/pin-icon.png"
                style={pinstyle}
              />
              <IconMenu
                iconButtonElement={
                  <IconButton
                    style={{
                      display: "inline",
                      float: "right",
                      width: "22px",
                      height: "22px",
                      padding: "0px"
                    }}
                    tooltip="more"
                    touch={true}
                    tooltipPosition="bottom-center"
                  >
                    <ContentMore />
                  </IconButton>
                }
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                targetOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem primaryText="Details" onTouchTap={this.details} />
              </IconMenu>
            </div>
            <Scrollbars
              autoHeightMax={20}
              renderTrackHorizontal={props =>
                <div
                  {...props}
                  className="track-horizontal"
                  style={{ display: "none" }}
                />}
              renderThumbHorizontal={props =>
                <div
                  {...props}
                  className="thumb-horizontal"
                  style={{ display: "none" }}
                />}
            >
              <p style={{ backgroundColor: this.props.children.color }}>
                <Linkifier>
                  {this.props.children.text}
                </Linkifier>
              </p>
              <div style={noteName}>
                {this.props.children.from}
              </div>
            </Scrollbars>
          </div>
        </div>
      );
    }
  }

  renderForm() {
    return (
      <div className="note" style={wordwrap}>
        <textarea
          ref="newText"
          maxLength="210"
          defaultValue={this.props.children.text}
          className="form-control"
        />

        <button
          style={savebtn}
          onClick={this.save}
          className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"
        />
      </div>
    );
  }
  render() {
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderDisplay();
    }
  }
}

@observer
export default class Boards extends React.Component {
  constructor() {
    super();
    socket = io.connect();

    this.state = {
      notes: [{ text: "yo" }],
      open: false
    };

    this.update = this.update.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.eachNote = this.eachNote.bind(this);
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  update(newText, i) {
    var arr = ChatStore.notes;
    // var arr = this.state.notes;
    arr[i].text = newText;
    ChatStore.notes[i].text = newText;
    this.setState({
      notes: arr,
      open: false
    });
  }

  add(text) {
    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    //console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    var date = mm + "/" + dd + "/" + yyyy;

    var arr = ChatStore.notes;
    var data = {
      roomId: ChatStore.groupId,
      from: UserStore.userrealname,
      date: date,
      time: time,
      text: text
    };
    // socket.emit("addingnotes", data);
    arr.push(data);
    // socket.on("roomNotes", function(data) {

    // });
    socket.emit("addnote", {
      roomId: ChatStore.groupId,
      from: UserStore.userrealname,
      date: date,
      time: time,
      text: text
    });

    //     var roomId = ChatStore.groupId;
    // var interval =  setTimeout(function(){ socket.emit('gettingnotes', roomId); }, 1000);
    // socket.emit('gettingnotes', roomId);
    // socket.on('catching notes',function(data){
    //   ChatStore.notes = data;
    //   clearInterval(interval);
    // })

    // this.setState({
    //   notes: arr
    // });
  }
  remove(i) {
    var arr = ChatStore.notes;
    arr.splice(i, 1);
    this.setState({
      notes: arr,
      open: false
    });
  }
  eachNote(note, i) {
    this.setState({
      notes: ChatStore.notes
    });
    // console.log("heloooo");
    if (note.from == UserStore.userrealname) {
      //  console.log("wohi bnda");
    }

    //  else console.log("dusra");
    return (
      <div className="displ">
        <Note
          key={note._id}
          index={i}
          onChange={this.update}
          onRemove={this.remove}
        >
          {note.text}
        </Note>
      </div>
    );
  }
  componentDidMount() {
    var board = React.findDOMNode(this);
    dragula([board]);
  }
  handleClose = () => {
    // this.setState({ openDialog: false });
    UIStore.notedetails = false;
  };
  render() {
    var variable = ChatStore.notes;
    // console.log("variable");
    // va = ChatStore.individualnote;
    // console.log(variable);
    var b;
    return (
      <div>
        {variable.map(Users => {
          if (Users.from == UserStore.userrealname) {
            Users.color = "#DCF8C6";
            //  console.log(Users.color);
            // var a = Users.from;

            // b = a.split(/\s(.+)/)[0]; //everything before the first space
            // Users.firstname = b;
            return (
              <div
                className="displ"
                key={Users._id}
                style={{ backgroundColor: Users.color }}
              >
                <Note
                  style={{ backgroundColor: Users.color }}
                  key={Users._id}
                  index={Users._id}
                  onChange={this.update}
                  onRemove={this.remove}
                >
                  {Users}
                </Note>
              </div>
            );
          } else {
            Users.color = "#FFF9C4";
            //   console.log(Users.color);
            // var a = Users.from;

            // b = a.split(/\s(.+)/)[0]; //everything before the first space
            // Users.firstname = b;
            //console.log(b);
            return (
              <div
                className="displ"
                key={Users._id}
                style={{ backgroundColor: Users.color }}
              >
                <Note
                  style={{ backgroundColor: Users.color }}
                  key={Users._id}
                  index={Users._id}
                  onChange={this.update}
                  onRemove={this.remove}
                >
                  {Users}
                </Note>
              </div>
            );
          }
        })}

        <div className="fixedbutton">
          <FloatingActionButton
            style={style}
            onTouchTap={this.handleTouchTap}
            label="yo"
            onClick={this.add.bind(null, "new note")}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Dialog
            modal={false}
            overlay={false}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
            open={UIStore.notedetails}
          >
            <h5>Note details</h5>
            <br />
            <div className="">
              <h5>
                Creator : {ChatStore.individualnote.from}
              </h5>
              <h5>
                Date : {ChatStore.individualnote.date}
              </h5>
              <h5>
                Time : {ChatStore.individualnote.time}
              </h5>
              <h5>
                Note: {ChatStore.individualnote.text}
              </h5>
            </div>
            <br />
          </Dialog>
          <Snackbar
            open={this.state.open}
            message="New Note Added"
            autoHideDuration={1200}
          />
          {/*onRequestClose={this.handleRequestClose}*/}
        </div>
      </div>
    );
  }
}

// Boards.propTypes = {
//   count: function(props, propName) {
//     if (typeof props[propName] !== "number") {
//       return new Error("The count property must be a number");
//     }
//     if (props[propName] > 100) {
//       return new Error("Creating " + props[propName] + "notes is ridiculous");
//     }
//   }
// };
