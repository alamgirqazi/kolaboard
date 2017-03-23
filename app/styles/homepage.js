import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'typewriteColor': {
    'color': '#00E676'
  },
  'typed-cursor': {
    'opacity': '1',
    'WebkitAnimation': 'blink 0.7s infinite',
    'MozAnimation': 'blink 0.7s infinite',
    'animation': 'blink 0.7s infinite'
  },
  'firstPage': {
    'textAlign': 'center',
    'marginTop': [{ 'unit': '%V', 'value': 0.15 }]
  },
  'secondPage': {
    'textAlign': 'center',
    'marginTop': [{ 'unit': '%V', 'value': 0.06 }]
  },
  'thirdPage': {
    'textAlign': 'center',
    'marginTop': [{ 'unit': '%V', 'value': 0.05 }]
  },
  'fourthPage': {
    'textAlign': 'center',
    'marginTop': [{ 'unit': '%V', 'value': 0.05 }]
  }
});
