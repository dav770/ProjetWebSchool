function funcConnect() {

    const myConnect = require('mysql');

    var pool = myConnect.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mydb'
    });

    return pool;
}

module.exports = {
    resConnect: funcConnect

}