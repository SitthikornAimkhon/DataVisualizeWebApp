// Reference: https://www.youtube.com/watch?v=7CqJlxBYj-M
// Test MongoDB connection
// and list all databases

const {MongoClient} = require('mongodb');


// function for list all the databases in the cluster
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// function for main
async function main(){
  // MongoDB URL Goes Here!!!
  const url = 'mongodb+srv://Admin:Admin12345@cluster0.0abvsny.mongodb.net/';

  // client
  const client = new MongoClient(url);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

// Print starting
console.log("Starting MongoDB...");
main().catch(console.error);