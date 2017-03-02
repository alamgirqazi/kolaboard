import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Scrollbars } from "react-custom-scrollbars";
import Toolbar from 'Toolbar';
import Boards from "app/components/Note.jsx";

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
<Toolbar/>
        <Scrollbars

          style={{ height: '100%' }}
          autoHeightMin={0}
          autoHeightMax={500}
          thumbMinSize={30}
        >
          {/*<Scrollbars style={{ width: 565, height: 500 }}*/}
          {/*
 autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}*/
          }

          <RaisedButton label="Board" primary={true} />

          <div class="panel">
            <Boards count={10} />
            <div className="fixedbutton">

              <FloatingActionButton style={style}>
                <ContentAdd />
              </FloatingActionButton>
            </div>

          </div>

        </Scrollbars>

        {/*</Infinite>*/}

      </div>
    );
  }
}
