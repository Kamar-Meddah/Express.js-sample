const express = require('express');
const app = express();
const fs=require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer({dest: '/public/img/' }); // for parsing multipart/form-data
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('./config/sessionStore'));



//loading all Ctrls
const commentsCtrl=require('./app/controller/commentsCtrl');
const articlesCtrl=require('./app/controller/articlesCtrl');
const usersCtrl=require('./app/controller/usersCtrl');
// administration Ctrls
const adminHomeCtrl=require('./app/controller/admin/adminHomeCtrl');
const adminUserCtrl=require('./app/controller/admin/adminUserCtrl');
const categoriesCtrl=require('./app/controller/admin/categoriesCtrl');
const adminArticlesCtrl=require('./app/controller/admin/articlesCtrl');


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
app.get('/',(request,response)=>{
    response.redirect('/1');
});
app.get('/:page',articlesCtrl.home);
app.get('/category=:cat=:id/:page',articlesCtrl.byCategorie);
app.get('/search/:page/',articlesCtrl.search);
app.get('/category=:categorie/post=:titre/:id/',articlesCtrl.show);
app.get('/users/login/',usersCtrl.index);

//post requests
app.post('/category=:categorie/post=:titre/:id/commenting',commentsCtrl.create)
app.post('/users/login/',usersCtrl.login);

//middlewares to check if user is connected if not block the code
app.use(require('./core/middlewares/logged'))

//------------------admin------------

//get
app.get('/admin/index/',adminHomeCtrl.index);
app.get('/admin/user/edit/username/',adminUserCtrl.usernameChange);
app.get('/admin/user/edit/password/',adminUserCtrl.passChange);
app.get('/users/logout/',adminUserCtrl.logout);
app.get('/admin/categories/:page',categoriesCtrl.index);
app.get('/admin/categories/edit/add/',categoriesCtrl.addCategorie);
app.get('/admin/categories/edit/:titre/:id/',categoriesCtrl.editCategorie);
app.get('/admin/articles/:page',adminArticlesCtrl.index);
app.get('/admin/articles/edit/add/',adminArticlesCtrl.add);


//post 
app.post('/category=:categorie/post=:titre/:id/',commentsCtrl.delete);
app.post('/admin/user/edit/password/',adminUserCtrl.passEdit);
app.post('/admin/user/edit/username/',adminUserCtrl.usernameEdit);
app.post('/admin/categories/edit/add/',categoriesCtrl.create);
app.post('/admin/categories/delete/',categoriesCtrl.delete);
app.post('/admin/categories/edit/:titre/:id/',categoriesCtrl.update);
app.post('/admin/articles/delete/',adminArticlesCtrl.delete);
app.post('/admin/articles/edit/add/',upload.single('avatar'),(req,res)=>{

  console.log(req.body)
  console.log(req.file)
});



//-------------------------------------------



//server port default=80
app.listen(80);