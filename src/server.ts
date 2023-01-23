import express from "express";
import fs from "fs";
import path from "path";
import resizeImage from "./utility/resizeImage";
import getFileName from "./utility/getFileName";
//const express = require('express')
const app = express();
const port = 3000;
// const widths: number[] = [];
// const heights: number[] = [];
const rootFolder: string = path.resolve(__dirname);
const optimizedImgPath = rootFolder + path.normalize("/public/img/optimized/");
const originalImgPath = rootFolder + path.normalize("/public/img/original/");
const file = fs.readdirSync(originalImgPath)[0];
let accessibleFile = "";

app.use(express.static(rootFolder));

const processImage = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const width = Number.parseInt(`${req.query.width}`) < 10 ? 10 : Number.parseInt(`${req.query.width}`);
  const height = Number.parseInt(`${req.query.height}`) < 10 ? 10 : Number.parseInt(`${req.query.height}`);
  const name = req.query.name;

  if (Object.keys(req.query).length < 1) {
      
    accessibleFile =
      originalImgPath + `${path.parse(file).name}${path.parse(file).ext}`;
    res.sendFile(accessibleFile);
  }

  else if(typeof name === 'undefined' || typeof name === null || typeof width === 'undefined' ||typeof width === null || typeof height === 'undefined' || typeof height === null){
      //res.sendFile(accessibleFile);
      res.send(`<h1> ERROR!!!</h1>
              <ol>
                <li><p>Please provide these three(3) query fields: <em><b>name</b></em>, <em><b>width</b></em> and <em><b>height</b></em></p></li>
                <li><p><em><b>name</b></em> should contain the name of the file in the original img folder</p></li>
                <li><p><em><b>height</b></em> should not be less than or equal to 0 and it should also not be a text</p></li>
                <li><p><em><b>width</b></em> should not be less than or equal to 0 and it should also not be a text</p></li>
              </ol>
              `);
  }

  else if(name !== path.parse(file).name){
    res.send(`
            <h1> ERROR!!!</h1>
            <p>Name of the file does not exist. Please provide a correct file name</p>
    
    `)
  }

  else{
    const filename = () => {
    
      getFileName
        .getExactFileByNameAsync(originalImgPath, `${name}`)
        .then((files) => {
          files.forEach((file) => {
            try {
              const fullPath = originalImgPath + file;
              if (
                fs.existsSync(
                  optimizedImgPath +
                    `${name}_${req.query.width}_${req.query.height}.${
                      path.parse(fullPath).ext
                    }`
                )
              ) {
                console.log("File Exists");
                accessibleFile =
                  optimizedImgPath +
                  `${path.parse(fullPath).name}_${width}_${height}.${
                    path.parse(fullPath).ext
                  }`;
              } else {
                if (!fs.existsSync(optimizedImgPath)) {
                  fs.mkdirSync(optimizedImgPath);
                }
                resizeImage(
                  originalImgPath +
                    `${req.query.name}${path.parse(fullPath).ext}`,
                  optimizedImgPath +
                    req.query.name +
                    `_${width}_${height}${path.parse(fullPath).ext}`,
                  width,
                  height
                );
                accessibleFile =
                  optimizedImgPath +
                  `${path.parse(fullPath).name}_${width}_${height}${
                    path.parse(fullPath).ext
                  }`;
                console.log("After Processing Image: " + accessibleFile);
              }
  
            } catch (err) {
              res.redirect("/api/images");
              
            }
          });
        });
    };
  
    filename();
    
    next();
  }
  
};

const accessImage = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  
  accessibleFile =
    optimizedImgPath +
    `${path.parse(file).name}_${req.query.width}_${req.query.height}${
      path.parse(file).ext
    }`;
  next();
};

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(rootFolder + path.normalize("/public/displayImage.html"));
});

app.use(processImage);
app.use(accessImage);

app.get("/api/images", (req: express.Request, res: express.Response) => {
  try {
    console.log("AccessibleFile: " + accessibleFile);

      const display = async (): Promise<void> => {
        const myPromise = new Promise((resolve) => {
          resolve(
            setTimeout(() => {
              res.sendFile(accessibleFile);
            }, 100)
          );
        });
        await myPromise;
      };

      display();
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
