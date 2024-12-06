const {Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: "postgres",
    port: "3306",
    password: '1234',
    database: 'terraclime'
})
client.connect(function(err) {
    if(err) throw err;
    else {
        console.log("Connected");
    }
})

module.exports = client;