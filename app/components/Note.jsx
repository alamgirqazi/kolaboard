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
  margin: "0 auto",
  display: "block"
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
        <div className="note">
          <div className="">
            {" "}<img src="assets/images/pin-icon.png" style={pinstyle} />
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
            {" "}<p>
              <Linkifier>
                {this.props.children.text}
              </Linkifier>
            </p>
            <h6> {this.props.children.from}</h6>
          </Scrollbars>

          <span>
            <button
              onClick={this.edit}
              className="btn btn-primary glyphicon glyphicon-pencil"
            />
            <button
              onClick={this.remove}
              className="btn btn-danger glyphicon glyphicon-trash"
            />
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

    return (
      <div className="displ">
        <Note key={i} index={i} onChange={this.update} onRemove={this.remove}>
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
    return (
      <div>
        {variable.map(Users => {
          return (
            <div className="displ">
              <Note
                key={i}
                index={i}
                onChange={this.update}
                onRemove={this.remove}
              >
                {Users}
              </Note>
            </div>
          );
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
