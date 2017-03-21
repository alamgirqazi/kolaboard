import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Nav from 'app/components/newnav.jsx';
import Homepage from 'app/components/homepage.jsx';

var FirstPage = () =>
{  
   
return (
<div>
<Nav/>
<Homepage/>
    {/*<h2 style="text-align: center"> A Collaboration app <em class="element typewriteColor" style="font-weight: 12px"></em></h2>*/}

</div>

    )
  
};

export default FirstPage;
  


