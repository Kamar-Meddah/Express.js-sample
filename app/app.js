const dbConnect=require('../core/database/mySqlDB');

class app{//Begin Class

     static getDb(){

        if(this.DB=== undefined){
            this.DB=new dbConnect(require('../config/dbconfig'));
            console.log('1st connection')
            
        }
        else{
            console.log('nth connection');
        }
        return this.DB.getDbConnect();
       
    }

}//END Class
module.exports=app;