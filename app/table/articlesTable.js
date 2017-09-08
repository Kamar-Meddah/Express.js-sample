const table = require('../../core/table/table');

class articlesTable extends table{

    constructor(){
        super();
        this.tab='articles';
    }

    countByCategorie(id,cb){
        this.db.query(`SELECT count(id) as total FROM ${this.tab} WHERE category_id=? `,[id],(err,rows)=>{
            cb(rows);
        })
    }

    byCategorie(id,arg=[],cb){
        this.db.query(`SELECT
        SUBSTRING(articles.contenu,1,200)as contenu,articles.id,articles.date,articles.titre,categories.titre as categorie
        FROM
        articles LEFT JOIN categories
        ON category_id=categories.id
        WHERE
        category_id=?
        ORDER BY articles.date DESC
        LIMIT ${arg[0]},${arg[1]};SELECT * FROM categories`,[id],(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
       }

       last(arg=[],cb){
        this.db.query(`SELECT
        articles.id,articles.titre,SUBSTRING(articles.contenu,1,200)as contenu,categories.titre as categorie,articles.category_id as catid,articles.date
        FROM
        articles LEFT JOIN categories
        ON articles.category_id=categories.id
        ORDER BY articles.date desc
        LIMIT ${arg[0]},${arg[1]};SELECT * FROM categories`,(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
        
       }

       all(arg=[],cb){
        this.db.query(`SELECT
        articles.id,articles.titre,categories.titre as categorie,articles.category_id as catid
        FROM
        articles LEFT JOIN categories
        ON articles.category_id=categories.id
        ORDER BY articles.date desc
        LIMIT ${arg[0]},${arg[1]};SELECT * FROM categories`,(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
        
       }

       search(index,arg=[],cb){
        let z=[];
        let t=[];
        let a=index.split(' ');
        a.forEach((value)=>{
            t.push('articles.titre LIKE ?');
            value='%'+value+'%';
            z.push(value);
       })
        t=t.join(' OR ');

        this.db.query(`
        SELECT
        articles.id,articles.titre,SUBSTRING(articles.contenu,1,200)as contenu,categories.titre as categorie,articles.category_id as catid,articles.date
        FROM
        articles LEFT JOIN categories
        ON articles.category_id=categories.id
        WHERE ${t}
        ORDER BY articles.date DESC
        LIMIT ${arg[0]},${arg[1]};SELECT * FROM categories`,z,(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
        
       }

       countSearch(index,cb){
        let z=[];
        let t=[];
        let a=index.split(' ');
        a.forEach((value)=>{
            t.push('articles.titre LIKE ?');
            value='%'+value+'%';
            z.push(value);
       })
        t=t.join(' OR ');
        this.db.query(`SELECT
        COUNT(id) as total
        FROM
        articles
        WHERE
         ${t}`,z,(err,rows)=>{
        cb(rows);
        })
    }

    find(id,cb){
        this.db.query(`      
        SELECT
        articles.id,articles.titre,articles.contenu,categories.titre as categorie,articles.category_id
        FROM
        articles LEFT JOIN categories
        ON articles.category_id=categories.id
        WHERE
        articles.id=?;SELECT * FROM categories`,[id],(err,rows)=>{
            if(err) throw err;
            cb(rows);
        });
        
       }

}

module.exports=new articlesTable();