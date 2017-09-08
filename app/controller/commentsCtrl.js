const appCtrl=require('../appCtrl');

class commentsCtrl extends appCtrl{

  create(request,response){
      if((request.body.name ===undefined) ||(request.body.name=='')||(request.body.comment ===undefined )||(request.body.comment=='')){
        request.setFlash('danger','veuillez enter votre nom et votre commentaire');
      }else{
      const comments=require('../app').getTable('comments');
      comments.create(["name","content","articles_id"],[request.body.name,request.body.comment,request.params.id]);
      request.setFlash('success','Votre commentaire a été poster');
    };
      response.redirect(`/category=${request.params.categorie}/post=${request.params.titre}/${request.params.id}/`);
  }

}
module.exports = new commentsCtrl();