import app from "../server";
import supertest from "supertest";
import path from "path";
import sharp from "sharp";

const request = supertest(app);

describe("Test Endpoint Responses", function () {
  it("Get Index Endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
  it("Get API Endpoint", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(200);
  });
});

describe("Test Image Destination", function () {
  it("Get Original Image", () => {
    const items = path
      .resolve("./build/img/original/coffee_cup.png")
      .split(path.sep);
    expect(items[items.length - 1]).toBe("coffee_cup.png");
  });
  it("Get Optimized Image", async function () {
    const items = path
      .resolve("./build/img/optimized/coffee_cup.png")
      .split(path.sep);
    await sharp(path.resolve("./build/img/original/coffee_cup.png"))
      .resize(200, 200)
      .toFile(
        path.resolve("./build/img/optimized/coffee_cup.png"),
        function (err) {
          console.log(err)
        }
      );
    expect(items[items.length - 1]).toBe("coffee_cup.png");
  });
});
