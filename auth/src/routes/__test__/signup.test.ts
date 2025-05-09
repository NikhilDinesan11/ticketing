import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
}, 30000); // Add timeout parameter for this specific test

it("return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "password",
    })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pad",
    })
    .expect(400);
});

it("return a 400 with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate email id", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successfull signup", async()=>{
  const response = await request(app)
  .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined()
})