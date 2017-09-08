const appCtrl=require('../../appCtrl');

class categoriesCtrl extends appCtrl{

  index (request, response) { 
    const categories=require('../../app').getTable('categories');
    let page=1;
    categories.countAll((nbr)=>{
      let parpage=6;
      if(isNaN(request.params.page)){
         page=1;
      }else{
       page=request.params.page;
      }
      let total=nbr[0].total;
      let nbpage=Math.ceil(total/parpage);
      let arg1=page*parpage-parpage;
      let arg2=parpage;
      let pageinfo={'nbr':nbpage,'p':page}
      //----------------------------
      categories.all([arg1,arg2],(rows)=>{
        response.render('admin/categoriesIndex',{'title':'Categories list','categories':rows,'pa':pageinfo});
      });
    })
}

  addCategorie(request, response){
    response.render('admin/categoriesAdd',{'title':'Add categories'});
  }

  editCategorie(request, response){
    response.render('admin/categoriesEdit',{'title':'Edit categories'});
  }

  create(request,response){
    const categories=require('../../app').getTable('categories');
    categories.create(['titre'],[request.body.titre]);
    request.setFlash('success','categorie inserted');
    response.redirect('/admin/categories/1/');
  }

  update(request,response){
    const categories=require('../../app').getTable('categories');
    categories.update(request.params.id,['titre'],[request.body.titre]);
    request.setFlash('success','categorie updated');
    response.redirect('/admin/categories/1/');
  }

  delete(request,response){
    const categories=require('../../app').getTable('categories');
    const articles=require('../../app').getTable('articles');
    articles.countByCategorie(request.body.id,(rows)=>{
      if(rows[0].total == 0){
           categories.delete(request.body.id);
           request.setFlash('success','categorie Deleted');
        response.redirect('/admin/categories/1/');
        
      }else{
        request.setFlash('danger','impossible de supprimer la categorie car elle n\'est pas vide');
        response.redirect('/admin/categories/1/');
      }

    })
  }
  
}
module.exports = new categoriesCtrl();