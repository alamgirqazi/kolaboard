import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
var Infinite = require('react-infinite');
import { Scrollbars } from 'react-custom-scrollbars';
import ReactScrollbar from 'react-scrollbar-js';

const style = {
  margin: 12,
};

export default class Chat extends React.Component {   

  render() {
    const styling = 
    {
width: '10px',
	backgroundColor: '#FFF',
    };
    
 const myScrollbar = {
      width: 400,
      height: 400,
    };
    return (

      <div className="">
      {/*<Infinite containerHeight={500} elementHeight={4} displayBottomUpwards style={styling}> */}
      <Scrollbars style={{ height: 500 }} autoHeightMin={0}
        autoHeightMax={500}
        thumbMinSize={30}>

        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
        <RaisedButton label="Chat" primary={true}/>
     <div class="panel">
                <h4>Content goes here...</h4>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>

            </div>
</Scrollbars>
 {/*</Infinite> */}


      </div>
    );
  }
}
