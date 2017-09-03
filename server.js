const express = require('express');
const app = express();
const fs=require('fs');
const bodyParser = require('body-parser');
const CT=require('./app/table/commentsTable');
const prettydate = require("pretty-date");


// view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


//router
app.get('/', function (request, response) {

  CT.last((rows)=>{
    response.render('com',{'title':'home','rows':rows,'prettydate':prettydate});
  })
  
});

app.post('/',(request,response)=>{

  CT.create(["name","content"],[request.body.name,request.body.msg],()=>{
    console.log('succesfull');
  });
  response.redirect('/');

})
app.listen(80);