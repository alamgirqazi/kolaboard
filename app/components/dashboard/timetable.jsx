import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
// import RaisedButton from "material-ui/RaisedButton";
// import muiThemeable from "material-ui/styles/muiThemeable";
 import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Toolbar from "app/components/toolbar.jsx";
import Boards from "app/components/Note.jsx";
// import Main from "app/components/main.jsx"
// import Store from "app/store/UIstore.js";
// import { observer } from "mobx-react";
import ListMessages from "app/components/listmessages.jsx";
import Chat from "app/components/chat.jsx";
import Board from "app/components/board.jsx";
import { greenA400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Store from "app/store/UIstore.js";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const muiTheme = getMuiTheme({
  palette: {
    //   textColor: greenA400,
    primary1Color: greenA400
    //  primary3Color:greenA400,
    //   accent1Color: greenA400,
    //   accent2Color: greenA400,
    //   accent3Color: greenA400

    //this is for changing the theme
  },
  toggle: {
    thumbOnColor: "yellow",
    trackOnColor: "red",
    backgroundColor: "red"
  },
  appBar: {
    height: 50
  }
});

const header = {
  textAlign: 'center',
};

const topdiv ={
marginBottom: "10px",
}
const width = 
{
  width:"700px",
}
export default class TimeTable extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {

	$(function(){
			$('.left .item').draggable({
				revert:true,
				proxy:'clone'
			});
			$('.right td.drop').droppable({
				onDragEnter:function(){
					$(this).addClass('over');
				},
				onDragLeave:function(){
					$(this).removeClass('over');
				},
				onDrop:function(e,source){
					$(this).removeClass('over');
					if ($(source).hasClass('assigned')){
						$(this).append(source);
					} else {
						var c = $(source).clone().addClass('assigned');
						$(this).empty().append(c);
						c.draggable({
							revert:true
						});
					}
				}
			});
			$('.left').droppable({
				accept:'.assigned',
				onDragEnter:function(e,source){
					$(source).addClass('trash');
				},
				onDragLeave:function(e,source){
					$(source).removeClass('trash');
				},
				onDrop:function(e,source){
					$(source).remove();
				}
			});
  });


    Store.timetable = true;       
             return(
           
           <MuiThemeProvider muiTheme={muiTheme}>
            <div>
             <Toolbar />
<br></br>
<h1 style={header}>Timetable</h1>





	<div className="demo-info" style={topdiv}>
		<div className="demo-tip icon-tip">&nbsp;</div>
		<div>Click and drag a className to timetable.</div>
	</div>

	<div style={width}>
		<div className="left">
			<table>
				<tr>
					<td><div className="item">English</div></td>
				</tr>
				<tr>
					<td><div className="item">Science</div></td>
				</tr>
				<tr>
					<td><div className="item">Music</div></td>
				</tr>
				<tr>
					<td><div className="item">History</div></td>
				</tr>
				<tr>
					<td><div className="item">Computer</div></td>
				</tr>
				<tr>
					<td><div className="item">Mathematics</div></td>
				</tr>
				<tr>
					<td><div className="item">Arts</div></td>
				</tr>
				<tr>
					<td><div className="item">Ethics</div></td>
				</tr>
			</table>
		</div>
		<div className="right">
			<table>
				<tr>
					<td className="blank"></td>
					<td className="title">Monday</td>
					<td className="title">Tuesday</td>
					<td className="title">Wednesday</td>
					<td className="title">Thursday</td>
					<td className="title">Friday</td>
				</tr>
				<tr>
					<td className="time">08:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
				<tr>
					<td className="time">09:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
				<tr>
					<td className="time">10:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
				<tr>
					<td className="time">11:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
				<tr>
					<td className="time">12:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
				<tr>
					<td className="time">13:00</td>
					<td className="lunch" colspan="5">Lunch</td>
				</tr>
				<tr>
					<td className="time">14:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
				<tr>
					<td className="time">15:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
				<tr>
					<td className="time">16:00</td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
					<td className="drop"></td>
				</tr>
			</table>
		</div>
	</div>




        </div> 
</MuiThemeProvider>
         );
  }
}



	// <div className="demo-info" style={topdiv}>
	// 	<div className="demo-tip icon-tip">&nbsp;</div>
	// 	<div>Click and drag a className to timetable.</div>
	// </div>

	// <div style={width}>
	// 	<div className="left">
	// 		<table>
	// 			<tr>
	// 				<td><div className="item">English</div></td>
	// 			</tr>
	// 			<tr>
	// 				<td><div className="item">Science</div></td>
	// 			</tr>
	// 			<tr>
	// 				<td><div className="item">Music</div></td>
	// 			</tr>
	// 			<tr>
	// 				<td><div className="item">History</div></td>
	// 			</tr>
	// 			<tr>
	// 				<td><div className="item">Computer</div></td>
	// 			</tr>
	// 			<tr>
	// 				<td><div className="item">Mathematics</div></td>
	// 			</tr>
	// 			<tr>
	// 				<td><div className="item">Arts</div></td>
	// 			</tr>
	// 			<tr>
	// 				<td><div className="item">Ethics</div></td>
	// 			</tr>
	// 		</table>
	// 	</div>
	// 	<div className="right">
	// 		<table>
	// 			<tr>
	// 				<td className="blank"></td>
	// 				<td className="title">Monday</td>
	// 				<td className="title">Tuesday</td>
	// 				<td className="title">Wednesday</td>
	// 				<td className="title">Thursday</td>
	// 				<td className="title">Friday</td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">08:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">09:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">10:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">11:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">12:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">13:00</td>
	// 				<td className="lunch" colspan="5">Lunch</td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">14:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">15:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 			<tr>
	// 				<td className="time">16:00</td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 				<td className="drop"></td>
	// 			</tr>
	// 		</table>
	// 	</div>
	// </div>