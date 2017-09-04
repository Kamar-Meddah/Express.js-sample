class table {//Begin Class

    constructor(db = require('../../app/app').getDb()){
        this.tab='';
        this.db=db;
    }

    all(cb){
     this.db.query(`SELECT * FROM ${this.tab} `,(err,rows)=>{
         if(err) throw err;
         cb(rows);
     });
    }
    
    all(id,cb){
        this.db.query(`SELECT * FROM ${this.tab} WHERE id=?`,[id],(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
       }
    
     last(cb){
        this.db.query(`SELECT * FROM ${this.tab} ORDER BY date DESC`,(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
       }
    
    create(fields=[],values=[]){
        let chain='';
        fields.forEach((field,i)=>{
            field+=' = ?'
            fields[i]=field;
        })
        chain= fields.join();
        this.db.query(`INSERT INTO ${this.tab} SET ${chain}`,values,(err)=>{
            if(err) throw err
        });
    }
     
    update(id,fields=[],values=[]){
        let chain='';
        fields.forEach((field,i)=>{
            field+=' = ?'
            fields[i]=field;
        })
        chain= fields.join();
        values=values.push(id);
        this.db.query(`UPDATE ${this.tab} SET ${chain} WHERE id=?`,values,(err)=>{
            if(err) throw err
        });
    }

    delete(id){
        this.db.query(`DELETE ${this.tab} WHERE id=?`,[id],(err)=>{
            if(err) throw err
        })
    }

}//End Class

module.exports=table;