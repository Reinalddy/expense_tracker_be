import request from "supertest";
import app from "../src/server.js";

describe("Auth API", () => {
    let token = "";

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                email: "f8V9o@example.com",
                password: "password",
                name: "John Doe"
            });

            // expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty("id");
            expect(res.body.data).toHaveProperty("email");
    });

    it("should login with registered user", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "f8V9o@example.com",
                password: "password"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");
        token = res.body.data.token;
    })
})