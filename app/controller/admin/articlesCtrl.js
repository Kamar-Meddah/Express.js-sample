const appCtrl=require('../../appCtrl');

class articlesCtrl extends appCtrl{

  index (request, response) { 
    const articles=require('../../app').getTable('articles');
    let page=1;
    articles.countAll((nbr)=>{
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
      articles.all([arg1,arg2],(rows)=>{
        response.render('admin/post/articlesIndex',{'title':'articles list','articles':rows,'pa':pageinfo});
      });
    })
}

  add(request, response){
    const categories=require('../../app').getTable('categories');
    categories.all2((row)=>{
      response.render('admin/post/articlesAdd',{'title':'Add articles','categories':row});
    })
  }

  edit(request, response){
    const categories=require('../../app').getTable('categories');
    const images=require('../../app').getTable('images');
    const articles=require('../../app').getTable('articles');
    images.findImg(request.params.id,(imgs)=>{
      categories.all2((row)=>{
        articles.find(request.params.id,(post)=>{
          response.render('admin/post/articlesEdit',{'title':'Edit articles','categories':row,'images':imgs,'article':post});
        })
      })
    })
  }

  create(request,response){
    const fs=require('fs');
    const articles=require('../../app').getTable('articles');
    
    articles.create(['titre','contenu','category_id'],[request.body.titre,request.body.content,request.body.category],(postId)=>{
      const images=require('../../app').getTable('images');
      request.files.forEach((element)=>{
        if(element.mimetype.split('/')[0] ==='image'){
        images.create(['articles_id'],[postId],(imgId)=>{
          fs.rename(`public/img/articles/${element.filename}`,`public/img/articles/${imgId}.jpg`,()=>{
            let name=imgId+'.jpg';
            images.update(imgId,['name'],[name]);
          })//end rename
        })//end image insert
      }else{fs.unlink(`public/img/articles/${element.filename}`,(err)=>{
        if (err) throw err;
      })}
      })//end files loop
    });
    request.setFlash('success','article inserted');
    response.redirect(`/admin/articles/1`);
  }//end create article

  update(request,response){
    const fs=require('fs');
    const articles=require('../../app').getTable('articles');
    
    articles.update(request.params.id,['titre','contenu','category_id'],[request.body.titre,request.body.content,request.body.category],()=>{
      const images=require('../../app').getTable('images');
      request.files.forEach((element)=>{
        if(element.mimetype.split('/')[0] ==='image'){
        images.create(['articles_id'],[request.params.id],(imgId)=>{
          fs.rename(`public/img/articles/${element.filename}`,`public/img/articles/${imgId}.jpg`,()=>{
            let name=imgId+'.jpg';
            images.update(imgId,['name'],[name]);
          })//end rename
        })//end image insert
      }else{fs.unlink(`public/img/articles/${element.filename}`,(err)=>{
        if (err) {}
      })}
      })//end files loop
    });
    request.setFlash('success','article updated');
    response.redirect(`/admin/articles/1`);
  }//end create article

  delete(request,response){
    const articles=require('../../app').getTable('articles');   
    const comments=require('../../app').getTable('comments');   
    const images=require('../../app').getTable('images');
    const fs=require('fs');

      images.findImg(request.body.id,(row)=>{
        row.forEach((element)=>{
          fs.unlink(`public/img/articles/${element.name}`,(err,res)=>{
           if (err) {};
          });
        })
      })
      comments.deleteCom(request.body.id);
      images.deleteImg(request.body.id,()=>{
    articles.delete(request.body.id);   
    
      });
       request.setFlash('success','articles supprimé');
        response.redirect('/admin/articles/1/');
  }
  
}
module.exports = new articlesCtrl();