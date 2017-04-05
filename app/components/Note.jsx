import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
var dragula = require('react-dragula');
var Linkify = require('react-linkify');

const wordwrap = {
    wordWrap: 'breakWord',
    overflow: 'hidden',

}
const style = {
  margin: 12,
   marginRight: 20,
};
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
    edit () {
        this.setState({editing: true,
              open: false,
});
    }
    save () {
        // this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.props.onChange(this.refs.newText.value, this.props.index);
        this.setState({editing: false,
        open: false});
    }
    remove () {
        this.props.onRemove(this.props.index);
    }
    renderDisplay () {
        return (
            <div className="note">
                <p>
                    {this.props.children}

                </p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            )
    }
    renderForm () {
        return (
            <div className="note" style={wordwrap}>
            <textarea ref="newText" maxLength="60" defaultValue={this.props.children} 
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    }
    render () {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
}

export default class Boards extends React.Component {
    constructor(){
        super();
        this.state = {
            notes: [
                'Quiz next tuesday',
                'Submit assignments by 10th March',
                'Football match at 4 p.m sharp',
                'blabla'
            ],
  open: false,
        };

        this.update = this.update.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);
    }


    handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

    update (newText,i) {
        var arr = this.state.notes;
        arr[i] = newText;
        this.setState({notes:arr,
              open: false,
});
    }

    add(text) {
        var arr = this.state.notes;
        arr.push(text);
        this.setState({notes: arr,
});
     }
    remove (i){
        var arr=this.state.notes;
        arr.splice(i,1);
        this.setState({notes: arr,
                      open: false,
});
    }
    eachNote (note,i){
        return (
            <div className="displ">
            <Note key={i}
                index={i}
                onChange={this.update}
                onRemove={this.remove}
                >
                {note}</Note>
            </div>
            
        );
    }
 componentDidMount(){
    var board = React.findDOMNode(this);
    dragula([board]);
  }
    render(){
        return (<div className="board">
                {this.state.notes.map(this.eachNote)}
                   <div className="fixedbutton">
      {/*onTouchTap={this.handleTouchTap}*/}
                   <FloatingActionButton style={style}   onTouchTap={this.handleTouchTap}
          label="yo" onClick={this.add.bind(null,"new note")}>
      <ContentAdd />
    </FloatingActionButton>

     <Snackbar
          open={this.state.open}
          message="New Note Added"
          autoHideDuration={1200}
        />
                                   {/*onRequestClose={this.handleRequestClose}*/}

                </div>
        </div>)
}
}

Boards.propTypes = {
        count: function(props,propName) {
            if(typeof props[propName] !=="number"){
                return new Error('The count property must be a number');
            }
            if(props[propName] > 100){
                return new Error("Creating "+ props[propName] +"notes is ridiculous");
            }
        }
    }
