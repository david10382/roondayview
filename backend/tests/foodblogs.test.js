const request = require("supertest")
const mongoose = require("mongoose")
const { app } = require("../src/server")

let token;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)

    const response = await request(app).post("/users/admin/login").send({
        username: "admin",
        password: "password"
    })
    token = response.body.token


})

afterAll(async () => {
    await mongoose.connection.close()
})

// 2.a Checking to get all the foodblogs
describe("Get foodblogs", () => {
    it("gets a list of foodblogs", async () => {
        const response = await request(app).get("/foodblogs")
        expect(response.statusCode).toBe(200)
    })
})



// 2.b Checking if create foodblogs work
describe("Create a foodblog", () => {
    it("creates a new foodblog", async () => {
        const response = await request(app).post("/foodblogs")
        .set({ Authorization: `Bearer ${token}`})
        .send({
            title: "Chinese Food",
            description: "Get some good chinese food",
            restaurant: "YamCkkkkka",
            price: 80,
            cuisine: "Chinese Food"
        })
        expect(response.statusCode).toBe(200)
    })
})

// 2.c check a specific foodblog
// describe("Get a specific foodblog", () => {
//     test("Get the specific foodblog", async () => {
//         const response = await request(app).get("/foodblogs/:foodblogId")
//         expect(response.statusCode).toBe(200)
//     })
// })