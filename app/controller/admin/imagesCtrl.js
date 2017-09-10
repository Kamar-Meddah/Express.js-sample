const appCtrl=require('../../appCtrl');

class imagesCtrl extends appCtrl{

  deleteImg(request,response){
    console.log('khabarni')
    const images=require('../../app').getTable('images');
    const fs=require('fs');
    fs.unlink(`public/img/articles/${request.body.imageName}`,(err)=>{
      if (err) {};
      images.delete(request.body.id);
    })
    request.setFlash('success','image supprimé');
    response.redirect(`/admin/articles/edit/${request.body.titre}/${request.body.postID}/`);
  }
  
}
module.exports = new imagesCtrl();