import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
var Infinite = require('react-infinite');
const style = {
  margin: 12,
};

export default class Chat extends React.Component {   

  render() {

    return (

      <div className="">
      <Infinite containerHeight={500} elementHeight={4} displayBottomUpwards>

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
                </ul>

            </div>
</Infinite>
      </div>
    );
  }
}
