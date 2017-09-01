const db = require('../dbConnect');

class table {

    constructor(){
        this.tab='';
    }
    
    all(cb){
     db.query(`SELECT * FROM ${this.tab} `,(err,rows)=>{
         if(err) throw err;
         cb(rows);
     });
    }
}

module.exports=table;