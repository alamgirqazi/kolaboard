import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Scrollbars } from "react-custom-scrollbars";
import Toolbar from 'Toolbar';
import Boards from "app/components/Note.jsx";
import Boardbar from 'app/components/toolbars/boardtoolbar.jsx';

const align =
{
  textAlign: 'center',
}
const style = {
  margin: 12,
  marginRight: 20
};

const heightboard={
  height: '100%',
}
export default class Board extends React.Component {
  render() {
    return (
      <div className="" style={heightboard}>
        {/*<Infinite containerHeight={500} elementHeight={10}  >*/}
<Boardbar/>
        <Scrollbars

          style={{ height: '100%' }}
          autoHeightMin={0}
          autoHeightMax={500}
          thumbMinSize={30}
        >


{/*<h4 style={align}>Noteboard</h4>*/}
<br/>
          <div className="panel">
            <Boards count={10} />
<br/>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>
          </div>

        </Scrollbars>

        {/*</Infinite>*/}

      </div>
    );
  }
}
