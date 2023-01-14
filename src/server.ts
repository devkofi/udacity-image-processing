import express from "express";
import fs from "fs";
import path from "path";
import imgProcessor from "./utility/imgProcessing";
import getFileName from "./utility/getFileName";
//const express = require('express')
const app = express();
const port = 3000;
// const widths: number[] = [];
// const heights: number[] = [];
const rootFolder: string = path.resolve(__dirname);
const optimizedImgPath = rootFolder + path.normalize("/public/img/optimized/");
const originalImgPath = rootFolder + path.normalize("/public/img/original/");
let accessibleFile = "";

app.use(express.static(rootFolder));

const processImage = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const filename = () => {
    getFileName
      .getExactFileByNameAsync(originalImgPath, `${req.query.filename}`)
      .then((files) => {
        files.forEach((file) => {
          try {
            const fullPath = originalImgPath + file;
            if (
              fs.existsSync(
                optimizedImgPath +
                  `${req.query.name}_${req.query.width}_${req.query.height}.${
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
              imgProcessor(
                originalImgPath +
                  `${req.query.filename}${path.parse(fullPath).ext}`,
                optimizedImgPath +
                  req.query.filename +
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
            console.error(err);
          }
        });
      });
  };

  filename();
  next();
};

const accessImage = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const file = fs.readdirSync(originalImgPath)[0];
  accessibleFile =
    optimizedImgPath +
    `${path.parse(file).name}_${req.query.width}_${req.query.height}${
      path.parse(file).ext
    }`;
  next();
};

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(rootFolder + "/public/displayImage.html");
});

app.use(processImage);
app.use(accessImage);

app.get("/api/images", (req: express.Request, res: express.Response) => {
  try {
    if (Object.keys(req.query).length < 1) {
      const file = fs.readdirSync(originalImgPath)[0];
      accessibleFile =
        originalImgPath + `${path.parse(file).name}${path.parse(file).ext}`;
      res.sendFile(accessibleFile);
    } else {
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
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
