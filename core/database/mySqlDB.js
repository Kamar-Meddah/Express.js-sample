class mySqlDB{

    constructor(path){
        this.mysql = require('mysql');
        this.path=path;
    }

    getDbConnect(){
        this.connection = this.mysql.createConnection(this.path);
        this.connection.connect();
        return this.connection;
    }
}
module.exports=mySqlDB;