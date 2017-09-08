const appCtrl=require('../../appCtrl');

class adminHomeCtrl extends appCtrl{

  index (request, response) { 
          response.render('admin/index',{'title':'mon administration'});
  }

  
}
module.exports = new adminHomeCtrl();