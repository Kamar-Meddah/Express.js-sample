module.exports={
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'a',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
 };