const appCtrl=require('../appCtrl');

class commentsCtrl extends appCtrl{

  getcomments (request, response) { 
      const comments=require('../app').getTable('comments');
      comments.last((rows)=>{
      response.render('com',{'title':'home','rows':rows,'prettydate':require("pretty-date")});  
      });
  }

  create(request,response){
      if((request.body.name ===undefined) ||(request.body.name=='')||(request.body.msg ===undefined )||(request.body.msg=='')){
        request.setFlash('danger','succ pff enfin');
      }else{
      const comments=require('../app').getTable('comments');
      comments.create(["name","content"],[request.body.name,request.body.msg]);
      request.setFlash('success','succ pff enfin');
    }
      response.redirect('/');
  }

}
module.exports = new commentsCtrl();