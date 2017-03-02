import React from 'react';

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
        this.setState({editing: true});
    }
    save () {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    }
    remove () {
        this.props.onRemove(this.props.index);
    }
    renderDisplay () {
        return (
            <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            );
    }
    renderForm () {
        return (
            <div className="note">
            <textarea ref="newText" defaultValue={this.props.children} 
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
                'Call Bill',
                'Email Lisa',
                'Make appointment',
                'Call ABC',
                'Email Lia',
                'Make apointment',
                'Send proposal'
            ]
        };
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);
    }
    update (newText,i) {
        var arr = this.state.notes;
        arr[i] = newText;
        this.setState({notes:arr});
    }
    remove (i){
        var arr=this.state.notes;
        arr.splice(i,1);
        this.setState({notes: arr});
    }
    eachNote (note,i){
        return (
            <Note key={i}
                index={i}
                onChange={this.update}
                onRemove={this.remove}
                >{note}</Note>
        );
    }
    render(){
        return (<div className="board">
                {this.state.notes.map(this.eachNote)};
        </div>);
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
