const table = require('../../core/table/table');

class usersTable extends table{

    constructor(){
        super();
        this.tab='users';
    }

    findPass(id,pass,cb){
        this.db.query(`SELECT * FROM users WHERE id=? AND password=? `,[id,pass],(err,rows)=>{
            cb(rows[0]);
        })
    }

}

module.exports=new usersTable();