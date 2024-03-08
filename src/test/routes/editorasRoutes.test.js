import { afterEach, beforeEach, describe, expect, jest } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

let server;

beforeEach(() => {
  const PORT = 3006;
  server = app.listen(PORT);
});

afterEach(() => {
  server.close();
});

describe("GET em /editoras", () => {
  it("should return a list of [editoras]", async () => {
    const response = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });
});

// it will register the id of editora created;
let idLastResponse;

describe("POST em /editoras", () => {
  it("should create a new editora", async () => {
    const editora = {
      nome: "Indeed",
      cidade: "Manaus",
      created_at: new Date().toISOString(),
      email: "editora@gmail.com",
      updated_at: new Date().toISOString(),
    };

    const response = await request(app)
      .post("/editoras")
      .send(editora)
      .expect(201);

    idLastResponse = response.body.content.id;
  });

  it("should not create when body is empty", async () => {
    const editora = {};

    await request(app).post("/editoras").send(editora).expect(400);
  });
});

describe("PUT em /editoras/:id", () => {
  test.each([
    ["nome", { nome: "CDC" }],
    ["cidade", { cidade: "Rio de Janeiro" }],
    ["email", { email: "cdc@gmail.com" }],
  ])("should update [%s] in editora", async (key, value) => {
    const requestIn = { request };
    const spy = jest.spyOn(requestIn, "request");

    await requestIn
      .request(app)
      .put(`/editoras/${idLastResponse}`)
      .send({ value })
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe("GET em /editoras/:id", () => {
  it("should get an editora", async () => {
    await request(app).get(`/editoras/${idLastResponse}`).expect(200);
  });
});

describe("DELETE em /editoras/:id", () => {
  it("should delete an editora", async () => {
    await request(app).delete(`/editoras/${idLastResponse}`).expect(200);
  });
});
