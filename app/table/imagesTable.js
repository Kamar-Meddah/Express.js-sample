const table = require('../../core/table/table');

class imagesTable extends table{

    constructor(){
        super();
        this.tab='images';
    }

   
   findImg(id,cb){
        this.db.query(`SELECT * FROM images WHERE articles_id=? `,[id],(err,rows)=>{
            cb(rows);
        })
    }
}

module.exports=new imagesTable();