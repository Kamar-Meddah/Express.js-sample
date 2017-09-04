const express = require('express');
const app = express();
const fs=require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const comCtrl=require('./app/controller/commentsCtrl');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('./config/sessionStore'));

// view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie:{secure:false}
}));
app.use(require('./core/middlewares/flash'))


//router
app.get('/',comCtrl.getcomments);


//post requests
app.post('/',comCtrl.create)


//server port default=80
app.listen(80);