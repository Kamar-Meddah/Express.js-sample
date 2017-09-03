class commentsCtrl{

  getcomments (request, response) {  
      const comments=require('../app').getTable('comments');
      comments.last((rows)=>{
      response.render('com',{'title':'home','rows':rows,'prettydate':require("pretty-date")});  
      });
  }

  create(request,response){
      const comments=require('../app').getTable('comments');          
      comments.create(["name","content"],[request.body.name,request.body.msg],()=>{
      console.log('succesfull');
      });
      response.redirect('/');
  }

}
module.exports = new commentsCtrl();