const table = require('../../core/table/table');

class commentsTable extends table{

    constructor(){
        super();
        this.tab='comments';
    }

    find(id,cb){
        this.db.query(`SELECT * FROM comments WHERE articles_id=? ORDER BY date DESC`,[id],(err,rows)=>{
            cb(rows);
        })
    }

    deleteCom(id,cb=null){
        this.db.query(`DELETE FROM comments WHERE articles_id=? `,[id],(err)=>{
            if(cb !== null){
                cb();
            }
        })
    }

}

module.exports=new commentsTable();