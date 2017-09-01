const table = require('../../core/table');
class commentsTable extends table{

    constructor(){
        super();
        this.tab='comments';
    }
}

module.exports=new commentsTable();