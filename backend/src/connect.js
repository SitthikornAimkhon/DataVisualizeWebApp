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

module.exports = {mongoConnect};

