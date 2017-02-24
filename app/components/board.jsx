import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

export default class Board extends React.Component {   

  render() {

    return (
      <div className="scrollable">
        <RaisedButton label="Board" primary={true}/>
     
      </div>
    );
  }
}
