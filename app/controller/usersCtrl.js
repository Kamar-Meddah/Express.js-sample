const appCtrl=require('../appCtrl');

class usersCtrl extends appCtrl{

  index (request, response) { 
    console.log(request.session)
    if(require('../app').getDbAuth().logged(request)){
      request.setFlash('warning','Vous etes déja connecté');      
      response.redirect('/admin/index/');

    }else{
      response.render('login',{'title':'login'});
    }
   }
  
   login (request, response) { 
    require('../app').getDbAuth().login([request.body.username,request.body.password],(row)=>{
      if(row !==undefined){
        request.session.userId=row.id;       
        request.setFlash('success','bienvenu a votre administration');
        response.redirect('/admin/index/');        
      }else{
        request.setFlash('danger','combinaison mots de passe, nom utilisateur est erroné');
        response.redirect('/users/login/');        
      }
    });
}

}
module.exports = new usersCtrl();