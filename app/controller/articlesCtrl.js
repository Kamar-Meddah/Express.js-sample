const appCtrl=require('../appCtrl');

class articlesCtrl extends appCtrl{

  home (request, response) { 
      const articles=require('../app').getTable('articles');
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
        articles.last([arg1,arg2],(rows)=>{
          response.render('index',{'title':'home','articles':rows[0],'categories':rows[1],'pa':pageinfo,'sanitizeHtml' : require('sanitize-html'),'ago':require('pretty-date').format});
        });
      })
  }

  byCategorie (request, response) { 
       const articles=require('../app').getTable('articles');
       let page=1;
       articles.countByCategorie(request.params.id,(nbr)=>{
         let parpage=2;
         if(isNaN(request.params.page)){
            page=1;
         }else{
          page=request.params.page;
         }
         let total=nbr[0].total;
         let nbpage=Math.ceil(total/parpage);
         let arg1=page*parpage-parpage;
         let arg2=parpage;
         let pageinfo={'nbr':nbpage,'p':page,'cat':request.params.cat,'id':request.params.id}
         //----------------------------
         articles.byCategorie(request.params.id,[arg1,arg2],(rows)=>{
           let title='';
         if(rows[0].length==0){
           title=request.params.cat;
         }else{ title=rows[0][0].categorie;}
           response.render('byCategorie',{'title':title,'articles':rows[0],'categories':rows[1],'pa':pageinfo,'sanitizeHtml' : require('sanitize-html'),'ago':require('pretty-date').format});
         }); 
       })
   }

   search (request, response) { 
    const url=require('url');
     if(url.parse(request.url,true).query.search !==undefined){
    const articles=require('../app').getTable('articles');
    let query=url.parse(request.url,true).query.search;
    let page=1;
    articles.countSearch(query,(nbr)=>{
      let parpage=2;
      if(isNaN(request.params.page)){
         page=1;
      }else{
       page=request.params.page;
      }
      let total=nbr[0].total;
      let nbpage=Math.ceil(total/parpage);
      let arg1=page*parpage-parpage;
      let arg2=parpage;
      let pageinfo={'nbr':nbpage,'p':page,'query':query}
      //----------------------------
      articles.search(query,[arg1,arg2],(rows)=>{
        let title='';
        title=`Search result for : ${query}`;
        response.render('search',{'title':title,'articles':rows[0],'categories':rows[1],'pa':pageinfo,'sanitizeHtml' : require('sanitize-html'),'ago':require('pretty-date').format});
      });

    })
  }else{response.redirect('/')}
   }

   show(request, response){
    const articles=require('../app').getTable('articles');
    const images=require('../app').getTable('images');
    const comments=require('../app').getTable('comments');
    let title='';
    if(request.params.id !==undefined ||request.params.id !== 0){
      articles.find(request.params.id,(post)=>{
        images.findImg(request.params.id,(img)=>{
          comments.find(request.params.id,(comments)=>{
            console.log(comments)
            title=post[0][0].titre;
            response.render('show',{'title':title,'images':img,'article':post[0][0],'categories':post[1],'comments' : comments,'ago':require('pretty-date').format});
          })
        })
      })
    }else{response.redirect('/')}
    
     
   }


}
module.exports = new articlesCtrl();