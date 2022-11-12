const mongoDb = require("mongodb");
const collection = {};
const connectToMongoDb = async () => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const mongoDbUrl = process.env.MONGODB_URL;
      console.log("Connecting to MongoDB...", mongoDbUrl);
      const client = new mongoDb.MongoClient(mongoDbUrl);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME);
      collection.user = db.collection("user");
      console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${collection.user.collectionName}`
      );
      resolve(client);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};
module.exports = { connectToMongoDb, collection };
