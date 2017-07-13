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
import ContentMore from "material-ui/svg-icons/navigation/expand-more";
import ActionDelete from "material-ui/svg-icons/action/delete";
import IconButton from "material-ui/IconButton";

const wordwrap = {
  wordWrap: "breakWord",
  overflow: "hidden"
};

const savebtn = {
  bottom: "1px"
};
const pinstyle = {
  width: "22px",
  height: "22px",
  margin: "0 50px",
  display: "inline-block"
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
      editing: false
    };

    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }
  edit() {
    this.setState({
      editing: true,
      open: false
    });
  }
  save() {
    // this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
    //  this.props.onChange(this.refs.newText.value, this.props.index);
    this.setState({
      editing: false,
      open: false
    });
  }
  remove() {
    this.props.onRemove(this.props.index);
  }
  renderDisplay() {
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
              onTouchTap={this.remove}
              tooltipPosition="bottom-center"
            >
              <ContentMore />
            </IconButton>
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
            <h6>
              {" "}{this.props.children.firstname}
            </h6>
          </Scrollbars>

          <span>
            <IconButton
              tooltip="edit"
              touch={true}
              onTouchTap={this.edit}
              tooltipPosition="bottom-center"
            >
              <svg
                fill="#000000"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </IconButton>
            <IconButton
              tooltip="edit"
              touch={true}
              onTouchTap={this.remove}
              tooltipPosition="bottom-center"
            >
              <ActionDelete />
            </IconButton>
          </span>
        </div>
      </div>
    );
  }
  renderForm() {
    return (
      <div className="note" style={wordwrap}>
        <textarea
          ref="newText"
          maxLength="250"
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
      date: today,
      time: time,
      text: text
    };
    arr.push(data);
    socket.emit("addnote", {
      roomId: ChatStore.groupId,
      from: UserStore.userrealname,
      date: today,
      time: time,
      text: text
    });

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
    console.log("heloooo");
    if (note.from == UserStore.userrealname) {
      console.log("wohi bnda");
    } else console.log("dusra");
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

  render() {
    var variable = ChatStore.notes;
    // console.log("variable");
    // console.log(variable);
    var b;
    return (
      <div>
        {variable.map(Users => {
          if (Users.from == UserStore.userrealname) {
            Users.color = "#DCF8C6";
            //  console.log(Users.color);
            var a = Users.from;

            b = a.split(/\s(.+)/)[0]; //everything before the first space
            Users.firstname = b;
            return (
              <div className="displ" style={{ backgroundColor: Users.color }}>
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
            var a = Users.from;

            b = a.split(/\s(.+)/)[0]; //everything before the first space
            Users.firstname = b;
            //console.log(b);
            return (
              <div className="displ" style={{ backgroundColor: Users.color }}>
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

Boards.propTypes = {
  count: function(props, propName) {
    if (typeof props[propName] !== "number") {
      return new Error("The count property must be a number");
    }
    if (props[propName] > 100) {
      return new Error("Creating " + props[propName] + "notes is ridiculous");
    }
  }
};

//$AV_ASW// <button
//   onClick={this.edit}
//   className="btn btn-primary glyphicon glyphicon-pencil"
// />
