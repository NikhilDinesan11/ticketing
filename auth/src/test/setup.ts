import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
      var signin: () => Promise<string[]>;
    }

// In setup.ts
let mongo: any; // Declare outside the function but don't initialize here

beforeAll(async () => {
  // Make sure JWT_KEY is set before any tests run
  process.env.JWT_KEY = "asdf";

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
  await mongoose.connection.close();
  await mongo.stop();
});


global.signin = async()=>{
  const email = "test@test.com"
  const password = "password"

  const response = await request(app)
  .post("/api/users/signup")
  .send({
    email,password
  })
  .expect(201)

    const cookie = response.get("Set-Cookie");
 
  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
}