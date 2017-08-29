var express = require('express');
var app = express();

app.get('/', function (request, response) {
  response.send('j suis a la home');
});
app.listen(80);