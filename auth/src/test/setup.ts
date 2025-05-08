import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"


// In setup.ts
let mongo: any;  // Declare outside the function but don't initialize here

beforeAll(async () => {
 
  // Make sure JWT_KEY is set before any tests run
  process.env.JWT_KEY = 'asdf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
   
      for (let collection of collections) {
        await collection.deleteMany({});
      }
    }
  });


  afterAll(async () => {
    await mongoose.connection.close()
    await mongo.stop()
  });
  