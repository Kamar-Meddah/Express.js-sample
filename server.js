const express = require('express');
const app = express();
const db = require('./dbConnect');
const fs=require('fs');
const bodyParser = require('body-parser');



// view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


//router
app.get('/', function (request, response) {
  response.render('index.ejs',{'title':'home'});
});

app.post('/',(request,response)=>{
  console.log(request.body);
  let name=request.body.name;
  let msg=request.body.msg;
  db.query("insert into comments set name= ? , content= ?",[name,msg],(err,res)=>{
    if (err) throw err;
  });
  response.redirect('/');


})


app.listen(80);