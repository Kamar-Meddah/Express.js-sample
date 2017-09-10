class table {//Begin Class

    constructor(db = require('../../app/app').getDb()){
        this.tab='';
        this.db=db;
    }

    countAll(cb){
        this.db.query(`SELECT count(id) as total FROM ${this.tab} `,(err,rows)=>{
            cb(rows);
        })
    }

    all(cb){
     this.db.query(`SELECT * FROM ${this.tab} ORDER BY titre ASC`,(err,rows)=>{
         if(err) throw err;
         cb(rows);
     });
    }
    
    find(id,cb){
        this.db.query(`SELECT * FROM ${this.tab} WHERE id=?`,[id],(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
       }
    
     last(arg=[],cb){
        this.db.query(`SELECT * FROM ${this.tab} ORDER BY date DESC LIMIT ${arg[0]},${arg[1]};SELECT * FROM categories`,(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
        
       }
    
    create(fields=[],values=[],cb=null){
        let chain='';
        fields.forEach((field,i)=>{
            field+=' = ?'
            fields[i]=field;
        })
        chain= fields.join();
        this.db.query(`INSERT INTO ${this.tab} SET ${chain}`,values,(err,res)=>{
            if(err) throw err
            if(cb !== null){
                cb(res.insertId);
            }
        });
    }
     
    update(id,fields=[],values=[],cb=null){ 
        let chain='';
        fields.forEach((field,i)=>{
            field+=' = ?'
            fields[i]=field;
        })
        chain= fields.join();
        values.push(id);
        this.db.query(`UPDATE ${this.tab} SET ${chain} WHERE id=?`,values,(err)=>{
            if(err) throw err
            if(cb !== null){
                cb();
            }
        });
    }

    delete(id){
        this.db.query(`DELETE FROM ${this.tab} WHERE id=?`,[id],(err)=>{
            if(err) throw err
        })
    }

}//End Class

module.exports=table;