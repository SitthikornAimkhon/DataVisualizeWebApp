// A program for testing connection to MongoDB 
// print all collections in all databases

const {MongoClient} = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("List All Databases");
    console.log("Databases:");
    for (const db of databasesList.databases) {
        await listCollections(client, db.name);
    }
};

async function listCollections(client, dbName){
    collectionsList = await client.db(dbName).listCollections().toArray();
    if (collectionsList.length > 0){
        console.log(` - ${dbName}`);
        collectionsList.forEach(collection => console.log(`    - ${collection.name}`));
    } else {
        console.log(` - ${dbName} has no collections`);
    }
};

async function main(){
    const url = 'mongodb+srv://Admin:Admin12345@cluster0.0abvsny.mongodb.net/';
    const client = new MongoClient(url);
    console.log("Connecting to server...");
    try {
        await client.connect();
        console.log("Connected successfully to server");
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log("Closing MongoDB...");
    }
}

console.log("Starting MongoDB...");
main().catch(console.error);

// exit
console.log("End of Program");