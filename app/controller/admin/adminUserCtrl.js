const appCtrl=require('../../appCtrl');

class adminUserCtrl extends appCtrl{

  passChange(request, response) { 
    response.render('admin/passchange',{'title':'nouveau mots de passe'});
   }

   passEdit(request, response) { 
   const user=require('../../app').getTable('users');
   const sha1=require('sha1')
   user.findPass(request.getUserId,sha1(request.body.ancien_pass),(row)=>{
       if(row !==undefined){
           user.update(request.getUserId,['password'],[sha1(request.body.new_pass)])
           request.setFlash('success','Votre mots de passe a été changé');
           response.redirect('/admin/user/edit/password/');
       }else{
           request.setFlash('danger','mots de passe incorrect');
           response.redirect('/admin/user/edit/password/');
       }
   })
    }

    usernameChange(request, response) { 
        response.render('admin/usernamechange',{'title':'nouveau nom d\'utilisateur'});
       }

    usernameEdit(request, response) { 
        const user=require('../../app').getTable('users');
        const sha1=require('sha1')
        user.findPass(request.getUserId,sha1(request.body.ancien_pass),(row)=>{
            if(row !==undefined){
                user.update(request.getUserId,['username'],[request.body.new_user])
                request.setFlash('success','Votre nom d\'utilisateur a été changé');
                response.redirect('/admin/user/edit/username/');
            }else{
                request.setFlash('danger','mots de passe incorrect');
                response.redirect('/admin/user/edit/username/');
            }
        })
         }

         logout(request, response) {
             request.session.userId=undefined;
             request.setFlash('success','vous etes deconneté');
             response.redirect('/');
         }
  


}
module.exports = new adminUserCtrl();