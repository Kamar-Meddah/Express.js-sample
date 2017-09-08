const appCtrl=require('../../appCtrl');

class articlesCtrl extends appCtrl{

  index (request, response) { 
    const articles=require('../../app').getTable('articles');
    let page=1;
    articles.countAll((nbr)=>{
      let parpage=4;
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
      articles.all([arg1,arg2],(rows)=>{
        response.render('admin/articlesIndex',{'title':'articles list','articles':rows[0],'pa':pageinfo});
      });
    })
}

  addCategorie(request, response){
    response.render('admin/articlesAdd',{'title':'Add articles'});
  }

  editCategorie(request, response){
    response.render('admin/articlesEdit',{'title':'Edit articles'});
  }

  create(request,response){
    const articles=require('../../app').getTable('articles');
    articles.create(['titre'],[request.body.titre]);
    request.setFlash('success','categorie inserted');
    response.redirect('/admin/articles/1/');
  }

  update(request,response){
    const articles=require('../../app').getTable('articles');
    articles.update(request.params.id,['titre'],[request.body.titre]);
    request.setFlash('success','categorie updated');
    response.redirect('/admin/articles/1/');
  }

  delete(request,response){
    const articles=require('../../app').getTable('articles');   
           articles.delete(request.body.id);
           request.setFlash('success','articles supprimé');
        response.redirect('/admin/articles/1/');
  }
  
}
module.exports = new articlesCtrl();