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

    deleteImg(id,cb=null){
        this.db.query(`DELETE FROM images WHERE articles_id=? `,[id],(err)=>{
            if(cb !== null){
                cb();
            }
        })
    }
}

module.exports=new imagesTable();