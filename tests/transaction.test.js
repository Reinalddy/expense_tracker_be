import request from "supertest";
import app from "../src/server.js";

describe("Transaction API", () => {
    let token = "";

    beforeAll(async () => {
        // login dulu untuk dapat token
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "f8V9o@example.com",
                password: "password"
            });

        token = res.body.data.token;
    });

    it("should add a new transaction", async () => {
        const res = await request(app)
            .post("/transactions")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Lunch",
                amount: 50000,
                type: "expense"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty("id");
    });

    it("should get transactions", async () => {
        const res = await request(app)
            .get("/transactions")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});