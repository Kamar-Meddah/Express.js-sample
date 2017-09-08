const table = require('../../core/table/table');

class commentsTable extends table{

    constructor(){
        super();
        this.tab='comments';
    }

    find(id,cb){
        this.db.query(`SELECT * FROM comments WHERE articles_id=? `,[id],(err,rows)=>{
            cb(rows);
        })
    }


}

module.exports=new commentsTable();