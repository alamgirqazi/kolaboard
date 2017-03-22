import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Nav from 'app/components/newnav.jsx';
import Homepage from 'app/components/homepage.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
var Infinite = require('react-infinite');


// const style = {
//     overflowY:'scroll',
// }
var FirstPage = () =>
{  
   
return (
<div>
            {/*<Infinite containerHeight={800} elementHeight={40}>*/}
      <Scrollbars  
    
             autoHeight
             autoHeightMax={700}
            renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}

                thumbMinSize={30}
        universal style={{}}>
        {/*autoHeight
        autoHeightMin={0}
        autoHeightMax={800}*/}

<Nav/>
<Homepage/>
    {/*<h2 style="text-align: center"> A Collaboration app <em class="element typewriteColor" style="font-weight: 12px"></em></h2>*/}
{/*</Infinite>*/}
</Scrollbars>
</div>

    )
  
};

export default FirstPage;
  


