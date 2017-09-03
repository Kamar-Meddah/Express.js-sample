class app{//Begin Class

     static getIntance(){
         if(this.instance === undefined){
             this.instance = new app();
         }
         return this.instance;
     }

     getDb(){
         
        if(this.DB=== undefined){
            const dbConnect=require('../core/database/mySqlDB');
            this.DB=new dbConnect(require('../config/dbconfig'));
        }
        return this.DB.getDbConnect();
    }

    getTable(name){
        let n=name+'Table';
        return require('./table/'+n);
    }

}//END Class
module.exports=app.getIntance();