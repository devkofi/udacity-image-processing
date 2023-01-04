import app from "../server";
import supertest from "supertest";
import path from "path"
import sharp from "sharp"
import fs from "fs"

const request = supertest(app);

describe("Test Endpoint Responses", function(){
    it("Get Index Endpoint", async () =>{
        const response = await request.get('/');
        expect(response.status).toBe(200);
        
    });
    // it("Get API Endpoint", async()=>{
    //     const response = await request.get('/api/images');
    //     expect(response.status).toBe(200);
    // })
});

describe("Test Image", function(){
    it("Get Original Image", () =>{
        const items = (path.resolve("./build/img/original/coffee_cup.png")).split(path.sep);
        console.log(items);
        //console.log(items.split(path.sep));
        expect(items[items.length - 1]).toBe("coffee_cup.png");
        
    });
    it("Get Optimized Image", async function (){
        const items = (path.resolve("./build/img/optimized/coffee_cup.png")).split(path.sep);
        await sharp(path.resolve("./build/img/original/coffee_cup.png"))
            .resize(200, 200)
            .toFile(path.resolve("./build/img/optimized/coffee_cup.png"), function(err) {
            console.log(err)
        });
        expect(items[items.length - 1]).toBe("coffee_cup.png");
        
    });

    it("Check Deleted Image", async function (){
        const imgPath = (path.resolve("./build/img/optimized/coffee_cup.png"));
        console.log(imgPath);
        try {
            if (fs.existsSync(imgPath)) {
              //file exists
              fs.unlink(imgPath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
            }
          } catch(err) {
            console.error(err)
          }

        
        expect(fs.existsSync(imgPath)).toBe(false);
    })

});