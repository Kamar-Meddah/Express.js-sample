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
          response.render('index',{'title':'home','articles':rows[0],'categories':rows[1],'pa':pageinfo});
        });
      })
  }

  byCategorie (request, response) { 
       const articles=require('../app').getTable('articles');
       let page=1;
       articles.countByCategorie(request.params.id,(nbr)=>{
         let parpage=1;
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
           response.render('byCategorie',{'title':title,'articles':rows[0],'categories':rows[1],'pa':pageinfo});
         });
 
       })
 
   }


}
module.exports = new articlesCtrl();