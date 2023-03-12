// Function to connect to mongoDB database ,
// Take mongoDB url, then return client object

const {MongoClient} = require('mongodb');

async function mongoConnect(mongoURL){
    const url = mongoURL;
    const client = new MongoClient(url);
    console.log("Connecting to server...");
    try {
        await client.connect();
        console.log("Connected successfully to server!");
        return client;
    } catch (e) {
        console.log("Fail to Connect.");
        console.error(e);
        return null;
    }
}

async function mysqlConnect(){

    const connection = mysql.createConnection({
    host: 'localhost',  // Replace with your MySQL host
    user: 'username',   // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'database_name' // Replace with your MySQL database name
    });

    connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }

    console.log('Connected to MySQL database with connection ID ' + connection.threadId);
    });

    // Don't forget to close the connection when you're done!
    connection.end();
}

module.exports = {mongoConnect};
module.exports = {mysqlConnect};

