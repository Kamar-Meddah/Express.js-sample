const table = require('../../core/table/table');

class categoriesTable extends table{

    constructor(){
        super();
        this.tab='categories';
    }

    all(arg=[],cb){
        this.db.query(`SELECT * FROM categories ORDER BY titre ASC LIMIT ${arg[0]},${arg[1]}`,(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
       }

    }

module.exports=new categoriesTable();