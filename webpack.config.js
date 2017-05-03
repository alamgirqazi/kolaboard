var webpack = require("webpack");

module.exports = {
  entry: [
    "script!jquery/dist/jquery.min.js",
    "script!foundation-sites/dist/foundation.min.js",
    "./app/app.jsx"
  ],
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  output: { path: __dirname, filename: "./public/bundle.js" },
  resolve: {
    root: __dirname,
    alias: {
      Main: "app/components/main.jsx",
      MainContainer: "app/components/MainContainer.jsx",
      Nav: "app/components/nav.jsx",
      UIstore: "app/store/UIstore.js",
      FirstPage: "app/components/firstpage.jsx",
      Homepage: "app/components/homepage.jsx",
      ListMessages: "app/components/ListMessages.jsx",
      ListChatContainer: "app/components/chat/ListChatContainer.jsx",
      LoginDialog: "app/components/loginmodal.jsx",
      SignupDialog: "app/components/signupmodal.jsx",
      Toolbar: "app/components/toolbar.jsx",
      NewNav: "app/components/newnav.jsx",
      DrawerOpenRightExample: "app/components/drawer.jsx",
      NewChatDrawer: "app/components/drawer/newchatdrawer.jsx",
      MainDashboard: "app/components/dashboard/maindashboard.jsx",
      Profile: "app/components/dashboard/profile.jsx",
      Settings: "app/components/dashboard/settings.jsx",
      Invites: "app/components/dashboard/invites.jsx",
      FindFriends: "app/components/dashboard/FindFriends.jsx",
      PrivateNotes: "app/components/dashboard/privatenotes.jsx",
      AcceptRequests: "app/components/dashboard/AcceptRequests.jsx",
      Chat: "app/components/chat.jsx",
      Board: "app/components/board.jsx",
      Boards: "app/components/Note.jsx",
      Chatbar: "app/components/toolbars/chattoolbar.jsx",
      Msgbar: "app/components/toolbars/msgtoolbar.jsx",
         TimeTable:"app/components/dashboard/timetable.jsx",
      Events:"app/components/dashboard/events.jsx",
      Lock: "public/assets/js/lock.min.js",
      Boardbar: "app/components/toolbars/boardtoolbar.jsx",
      Verify: "app/components/authentication/verify.jsx",
      applicationStyles: "app/styles/app.scss",
      HomepageStyles: "app/styles/homepage.scss",
      noteStyle: "app/styles/notestyle.scss",
      snowStyle: "app/styles/quill.snow.scss",
      coreStyle: "app/styles/quill.core.css",
      bubbleStyle: "app/styles/quill.bubble.css"
    },
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        loader: ["babel-loader"],
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["transform-decorators-legacy", "transform-class-properties"]
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: "cheap-module-eval-source-map"
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
