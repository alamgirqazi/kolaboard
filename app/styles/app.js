// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//   'fixedbutton': {
//     'position': 'fixed',
//     'bottom': [{ 'unit': 'px', 'value': 15 }],
//     'right': [{ 'unit': 'px', 'value': 15 }]
//   },
//   'margin': {
//     'paddingLeft': [{ 'unit': 'px', 'value': 0 }],
//     'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
//     'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
//   },
//   'html': {
//     'overflow': 'hidden'
//   },
//   'body': {
//     'overflow': 'hidden'
//   },
//   'padding': {
//     'paddingLeft': [{ 'unit': 'px', 'value': 0 }],
//     'paddingRight': [{ 'unit': 'px', 'value': 0 }]
//   },
//   'paddingleft': {
//     'paddingLeft': [{ 'unit': 'px', 'value': 0 }],
//     'paddingRight': [{ 'unit': 'px', 'value': 1 }]
//   },
//   'p': {
//     'color': '#555'
//   },
//   'fullWidth': {
//     'width': [{ 'unit': '%H', 'value': 1 }],
//     'marginLeft': [{ 'unit': 'string', 'value': 'auto' }],
//     'marginRight': [{ 'unit': 'string', 'value': 'auto' }],
//     'maxWidth': [{ 'unit': 'string', 'value': 'initial' }]
//   },
//   'fullheight': {
//     'height': [{ 'unit': 'vh', 'value': 100 }],
//     'marginTop': [{ 'unit': 'string', 'value': 'auto' }],
//     'marginBottom': [{ 'unit': 'string', 'value': 'auto' }],
//     'height': [{ 'unit': '%V', 'value': 1 }],
//     'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
//     'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
//     'bottom': [{ 'unit': 'px', 'value': 0 }]
//   },
//   'abc': {
//     'backgroundColor': '#00E676 !important'
//   },
//   'img': {
//     'width': [{ 'unit': 'px', 'value': 115 }],
//     'padding': [{ 'unit': 'rem', 'value': 0 }, { 'unit': 'rem', 'value': 0 }, { 'unit': 'rem', 'value': 0 }, { 'unit': 'rem', 'value': 0 }]
//   },
//   'top-bar': {
//     'backgroundColor': '#EDF8F5'
//   },
//   'top-bar ul': {
//     'backgroundColor': '#EDF8F5'
//   },
//   'body': {
//     'fontFamily': ''Roboto', sans-serif'
//   },
//   '::selection': {
//     'background': 'rgba(82, 179, 217, 0.3)',
//     'color': 'inherit'
//   },
//   'a': {
//     'color': 'rgba(82, 179, 217, 0.9)'
//   },
//   'back': {
//     'position': 'absolute',
//     'width': [{ 'unit': 'px', 'value': 90 }],
//     'height': [{ 'unit': 'px', 'value': 50 }],
//     'top': [{ 'unit': 'px', 'value': 0 }],
//     'left': [{ 'unit': 'px', 'value': 0 }],
//     'color': '#fff',
//     'lineHeight': [{ 'unit': 'px', 'value': 50 }],
//     'fontSize': [{ 'unit': 'px', 'value': 30 }],
//     'paddingLeft': [{ 'unit': 'px', 'value': 10 }],
//     'cursor': 'pointer'
//   },
//   'back img': {
//     'position': 'absolute',
//     'top': [{ 'unit': 'px', 'value': 5 }],
//     'left': [{ 'unit': 'px', 'value': 30 }],
//     'width': [{ 'unit': 'px', 'value': 40 }],
//     'height': [{ 'unit': 'px', 'value': 40 }],
//     'backgroundColor': 'rgba(255, 255, 255, 0.98)',
//     'borderRadius': '100%',
//     'WebkitBorderRadius': '100%',
//     'MozBorderRadius': '100%',
//     'MsBorderRadius': '100%',
//     'marginLeft': [{ 'unit': 'px', 'value': 15 }]
//   },
//   'back:active': {
//     'background': 'rgba(255, 255, 255, 0.2)'
//   },
//   'name': {
//     'position': 'absolute',
//     'top': [{ 'unit': 'px', 'value': 3 }],
//     'left': [{ 'unit': 'px', 'value': 110 }],
//     'fontFamily': ''Lato'',
//     'fontSize': [{ 'unit': 'px', 'value': 25 }],
//     'fontWeight': '300',
//     'color': 'rgba(255, 255, 255, 0.98)',
//     'cursor': 'default'
//   },
//   'last': {
//     'position': 'absolute',
//     'top': [{ 'unit': 'px', 'value': 30 }],
//     'left': [{ 'unit': 'px', 'value': 115 }],
//     'fontFamily': ''Lato'',
//     'fontSize': [{ 'unit': 'px', 'value': 11 }],
//     'fontWeight': '400',
//     'color': 'rgba(255, 255, 255, 0.6)',
//     'cursor': 'default'
//   },
//   // M E S S A G E S
//   'chat': {
//     'listStyle': 'none',
//     'background': 'none',
//     'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
//     'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 50 }, { 'unit': 'px', 'value': 0 }],
//     'marginTop': [{ 'unit': 'px', 'value': 60 }],
//     'marginBottom': [{ 'unit': 'px', 'value': 10 }]
//   },
//   'chat li': {
//     'padding': [{ 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 0.5 }],
//     'overflow': 'hidden',
//     'display': 'flex'
//   },
//   'chat avatar': {
//     'width': [{ 'unit': 'px', 'value': 40 }],
//     'height': [{ 'unit': 'px', 'value': 40 }],
//     'position': 'relative',
//     'display': 'block',
//     'zIndex': '2',
//     'borderRadius': '100%',
//     'WebkitBorderRadius': '100%',
//     'MozBorderRadius': '100%',
//     'MsBorderRadius': '100%',
//     'backgroundColor': 'rgba(255, 255, 255, 0.9)'
//   },
//   'chat avatar img': {
//     'width': [{ 'unit': 'px', 'value': 40 }],
//     'height': [{ 'unit': 'px', 'value': 40 }],
//     'borderRadius': '100%',
//     'WebkitBorderRadius': '100%',
//     'MozBorderRadius': '100%',
//     'MsBorderRadius': '100%',
//     'backgroundColor': 'rgba(255, 255, 255, 0.9)',
//     'WebkitTouchCallout': 'none',
//     'WebkitUserSelect': 'none',
//     'MozUserSelect': 'none',
//     'MsUserSelect': 'none'
//   },
//   'chat day': {
//     'position': 'relative',
//     'display': 'block',
//     'textAlign': 'center',
//     'color': '#c0c0c0',
//     'height': [{ 'unit': 'px', 'value': 20 }],
//     'textShadow': [{ 'unit': 'px', 'value': 7 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 4 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': -1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': -2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': -3 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': -4 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': -5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': -6 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'px', 'value': -7 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5' }],
//     'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': -20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#e5e5e5,' }, { 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': -2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#d7d7d7' }],
//     'lineHeight': [{ 'unit': 'px', 'value': 38 }],
//     'marginTop': [{ 'unit': 'px', 'value': 5 }],
//     'marginBottom': [{ 'unit': 'px', 'value': 20 }],
//     'cursor': 'default',
//     'WebkitTouchCallout': 'none',
//     'WebkitUserSelect': 'none',
//     'MozUserSelect': 'none',
//     'MsUserSelect': 'none'
//   },
//   'other msg': {
//     'order': '1',
//     'borderTopLeftRadius': '0px',
//     'boxShadow': [{ 'unit': 'px', 'value': -1 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#D4D4D4' }]
//   },
//   'other:before': {
//     'content': '""',
//     'position': 'relative',
//     'top': [{ 'unit': 'px', 'value': 0 }],
//     'right': [{ 'unit': 'px', 'value': 0 }],
//     'left': [{ 'unit': 'px', 'value': 40 }],
//     'width': [{ 'unit': 'px', 'value': 0 }],
//     'height': [{ 'unit': 'px', 'value': 0 }],
//     'border': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#fff' }],
//     'borderLeftColor': 'transparent',
//     'borderBottomColor': 'transparent'
//   },
//   'self': {
//     'justifyContent': 'flex-end',
//     'alignItems': 'flex-end'
//   },
//   'self msg': {
//     'order': '1',
//     'borderBottomRightRadius': '0px',
//     'boxShadow': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#D4D4D4' }]
//   },
//   'self avatar': {
//     'order': '2'
//   },
//   'self avatar:after': {
//     'content': '""',
//     'position': 'relative',
//     'display': 'inline-block',
//     'bottom': [{ 'unit': 'px', 'value': 19 }],
//     'right': [{ 'unit': 'px', 'value': 0 }],
//     'width': [{ 'unit': 'px', 'value': 0 }],
//     'height': [{ 'unit': 'px', 'value': 0 }],
//     'border': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#fff' }],
//     'borderRightColor': 'transparent',
//     'borderTopColor': 'transparent',
//     'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#D4D4D4' }]
//   },
//   'msg': {
//     'background': 'white',
//     'minWidth': [{ 'unit': 'px', 'value': 50 }],
//     'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }],
//     'borderRadius': '2px',
//     'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.07)' }]
//   },
//   'msg p': {
//     'fontSize': [{ 'unit': 'rem', 'value': 0.8 }],
//     'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.2 }, { 'unit': 'px', 'value': 0 }],
//     'color': '#777'
//   },
//   'msg img': {
//     'position': 'relative',
//     'display': 'block',
//     'width': [{ 'unit': 'px', 'value': 450 }],
//     'borderRadius': '5px',
//     'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': '#eee' }],
//     'transition': 'all 0.4s cubic-bezier(0.565, -0.26, 0.255, 1.41)',
//     'cursor': 'default',
//     'WebkitTouchCallout': 'none',
//     'WebkitUserSelect': 'none',
//     'MozUserSelect': 'none',
//     'MsUserSelect': 'none',
//     'screen&&<w800': {
//       'width': [{ 'unit': 'px', 'value': 300 }]
//     },
//     'screen&&<w550': {
//       'width': [{ 'unit': 'px', 'value': 200 }]
//     }
//   },
//   'msg time': {
//     'fontSize': [{ 'unit': 'rem', 'value': 0.7 }],
//     'color': '#ccc',
//     'marginTop': [{ 'unit': 'px', 'value': 3 }],
//     'float': 'right',
//     'cursor': 'default',
//     'WebkitTouchCallout': 'none',
//     'WebkitUserSelect': 'none',
//     'MozUserSelect': 'none',
//     'MsUserSelect': 'none'
//   },
//   'msg time:before': {
//     'content': '"\f017"',
//     'color': '#ddd',
//     'fontFamily': 'FontAwesome',
//     'display': 'inline-block',
//     'marginRight': [{ 'unit': 'px', 'value': 4 }]
//   },
//   'emoji': {
//     'display': 'inline-block',
//     'height': [{ 'unit': 'px', 'value': 18 }],
//     'width': [{ 'unit': 'px', 'value': 18 }],
//     'backgroundSize': 'cover',
//     'backgroundRepeat': 'no-repeat',
//     'marginTop': [{ 'unit': 'px', 'value': -7 }],
//     'marginRight': [{ 'unit': 'px', 'value': 2 }],
//     'transform': 'translate3d(0px, 3px, 0px)'
//   },
//   'emojiplease': {
//     'backgroundImage': 'url(http://imgur.com/ftowh0s.png)'
//   },
//   'emojilmao': {
//     'backgroundImage': 'url(http://i.imgur.com/MllSy5N.png)'
//   },
//   'emojihappy': {
//     'backgroundImage': 'url(http://imgur.com/5WUpcPZ.png)'
//   },
//   'emojipizza': {
//     'backgroundImage': 'url(http://imgur.com/voEvJld.png)'
//   },
//   'emojicryalot': {
//     'backgroundImage': 'url(http://i.imgur.com/UUrRRo6.png)'
//   },
//   'emojibooks': {
//     'backgroundImage': 'url(http://i.imgur.com/UjZLf1R.png)'
//   },
//   'emojimoai': {
//     'backgroundImage': 'url(http://imgur.com/uSpaYy8.png)'
//   },
//   'emojisuffocated': {
//     'backgroundImage': 'url(http://i.imgur.com/jfTyB5F.png)'
//   },
//   'emojiscream': {
//     'backgroundImage': 'url(http://i.imgur.com/tOLNJgg.png)'
//   },
//   'emojihearth_blue': {
//     'backgroundImage': 'url(http://i.imgur.com/gR9juts.png)'
//   },
//   'emojifunny': {
//     'backgroundImage': 'url(http://i.imgur.com/qKia58V.png)'
//   },
//   '::-webkit-scrollbar': {
//     'minWidth': [{ 'unit': 'px', 'value': 12 }],
//     'width': [{ 'unit': 'px', 'value': 12 }],
//     'maxWidth': [{ 'unit': 'px', 'value': 12 }],
//     'minHeight': [{ 'unit': 'px', 'value': 12 }],
//     'height': [{ 'unit': 'px', 'value': 12 }],
//     'maxHeight': [{ 'unit': 'px', 'value': 12 }],
//     'background': '#e5e5e5',
//     'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 50 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'rgba(82, 179, 217, 0.9)' }, { 'unit': 'string', 'value': 'rgba(82, 179, 217, 0.9),' }, { 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': -52 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '#fafafa' }]
//   },
//   '::-webkit-scrollbar-thumb': {
//     'background': '#bbb',
//     'border': [{ 'unit': 'string', 'value': 'none' }],
//     'borderRadius': '100px',
//     'border': [{ 'unit': 'string', 'value': 'solid' }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': '#e5e5e5' }],
//     'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': '#999' }]
//   },
//   '::-webkit-scrollbar-thumb:hover': {
//     'background': '#b0b0b0',
//     'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': '#888' }]
//   },
//   '::-webkit-scrollbar-thumb:active': {
//     'background': '#aaa',
//     'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': '#7f7f7f' }]
//   },
//   '::-webkit-scrollbar-button': {
//     'display': 'block',
//     'height': [{ 'unit': 'px', 'value': 26 }]
//   },
//   'inputtextarea': {
//     'position': 'fixed',
//     'bottom': [{ 'unit': 'px', 'value': 0 }],
//     'left': [{ 'unit': 'px', 'value': 0 }],
//     'right': [{ 'unit': 'px', 'value': 0 }],
//     'width': [{ 'unit': '%H', 'value': 1 }],
//     'height': [{ 'unit': 'px', 'value': 50 }],
//     'zIndex': '99',
//     'background': '#fafafa',
//     'border': [{ 'unit': 'string', 'value': 'none' }],
//     'outline': 'none',
//     'paddingLeft': [{ 'unit': 'px', 'value': 55 }],
//     'paddingRight': [{ 'unit': 'px', 'value': 55 }],
//     'color': '#666',
//     'fontWeight': '400'
//   },
//   'emojis': {
//     'position': 'fixed',
//     'display': 'block',
//     'bottom': [{ 'unit': 'px', 'value': 8 }],
//     'left': [{ 'unit': 'px', 'value': 7 }],
//     'width': [{ 'unit': 'px', 'value': 34 }],
//     'height': [{ 'unit': 'px', 'value': 34 }],
//     'backgroundImage': 'url(http://i.imgur.com/5WUpcPZ.png)',
//     'backgroundRepeat': 'no-repeat',
//     'backgroundSize': 'cover',
//     'zIndex': '100',
//     'cursor': 'pointer'
//   },
//   'emojis:active': {
//     'opacity': '0.9'
//   }
// });
