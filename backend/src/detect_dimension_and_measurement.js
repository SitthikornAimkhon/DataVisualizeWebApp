const { type } = require('os');
const Connect = require('./connect.js');

const URL = 'mongodb+srv://Admin:Admin12345@cluster0.0abvsny.mongodb.net/';

const dbName = 'Test01';
const collectionName = 'test'


async function detectDim() {

    var dimension = []
    var measurement = []

    //connect to database
    const client = await Connect.mongoConnect(URL);
  
    // check if the connection was successful
    if (!client) {
      console.error('Unable to connect to MongoDB');
    }
    
    // get a reference to the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // query the collection and process data
    const cursor = collection.find();
   
    await cursor.forEach(doc => {
        console.log(`- Document ${doc._id}:`);
   
    if (doc){
        console.log(`   - ${collectionName}`);

        for (const field in doc){
            if ((typeof doc[field]) == 'number' ) {
                measurement.push(doc[field]);
                console.log(`     - ${field}: ${typeof doc[field]}`);
                }
            else {
                dimension.push(doc[field]);
                console.log(`     - ${field}: ${typeof doc[field]}`);
            }}}
    else {
        console.log(`   - ${collectionName} has no data`);
    }
});
    // close the connection when you're done
    client.close();
    console.log(measurement);
  }


  detectDim();

