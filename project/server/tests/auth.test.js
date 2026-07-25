import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app.js";

describe("Auth routes", () => {
  it("should reject registration with invalid data", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "",
      email: "not-an-email",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Name is required");
    expect(response.body.message).toContain("Email must be valid");
    expect(response.body.message).toContain("Password must be at least 8 characters long");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "Name is required" }),
        expect.objectContaining({ message: "Email must be valid" }),
        expect.objectContaining({ message: "Password must be at least 8 characters long" }),
      ])
    );
  });
});
