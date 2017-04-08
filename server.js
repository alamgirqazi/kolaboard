var express = require('express');

// Create our app
var app = express();

const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req,res,next)
{
if(req.headers['x-forwarded-proto']=== 'https')
{
  res.redirect('http://' + req.hostname + req.url);

} else {
next();

}
});

const authCheck = jwt({
  secret: 'AUTH0_CLIENT_SECRET',
  audience: 'AUTH0_CLIENT_ID '
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
// app.get('/app', authCheck, (req,res)=>{

// console.log('route hit');
// });

app.listen(PORT, function () {
  console.log('Express server is up on port: ' + PORT);
});
