import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app.js";

describe("Health routes", () => {
  it("should return healthy status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expect.objectContaining({ status: "ok" }));
  });
});
