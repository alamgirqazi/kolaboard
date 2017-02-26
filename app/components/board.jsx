import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
var Infinite = require('react-infinite');

const style = {
  margin: 12,
};

export default class Board extends React.Component {   

  render() {

    return (
      <div className="">
      <Infinite containerHeight={500} elementHeight={10} displayBottomUpwards >

        <RaisedButton label="Board" primary={true}/>
          
           <div class="panel">
                <h4>Content goes here...</h4>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
                </div>
           </Infinite>

      </div>
    );
  }
}
