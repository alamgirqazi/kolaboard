var webpack = require('webpack');


module.exports = {
  entry:
  [
  "script!jquery/dist/jquery.min.js",
  "script!foundation-sites/dist/foundation.min.js",
  "./app/app.jsx"
  ],
  externals: {
jquery: 'jQuery'
  },
   plugins: [
            new webpack.ProvidePlugin({
              '$':'jquery',
              'jQuery':'jquery'

            })
               ],
  output: {path: __dirname, filename: "./public/bundle.js"},
  resolve: {
    root: __dirname,
    alias: {
      Main: "app/components/main.jsx",
      Nav: "app/components/nav.jsx",
      FirstPage: "app/components/firstpage.jsx",
      LeftSide: "app/components/leftside.jsx",
      ListMessages: "app/components/ListMessages.jsx",
      LoginDialog: "app/components/loginmodal.jsx",
      SignupDialog: "app/components/signupmodal.jsx",
      Toolbar: "app/components/toolbar.jsx",
      NewNav: "app/components/newnav.jsx",
      DrawerOpenRightExample: "app/components/drawer.jsx",
      Chat: "app/components/chat.jsx",
      Board: "app/components/board.jsx",
      Boards: "app/components/Note.jsx",
      applicationStyles: 'app/styles/app.scss',
      noteStyle: 'app/styles/notestyle.scss'
    },
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        loader:['babel-loader'],
        query: {presets: ["react", "es2015", "stage-0"]},
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};



//   module: {
//     loaders: [
//       {
//         loaders:['react-hot','babel-loader'],
//         query: {presets: ["react", "es2015", "stage-0"]},
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/
//       }
//     ]
//   },
//   devtool: 'cheap-module-eval-source-map'
// };
