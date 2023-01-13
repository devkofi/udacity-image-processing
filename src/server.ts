import express from "express";
import fs from "fs";
import path from "path";
import imgProcessing from "./utility/imgProcessing";
import getFileName from "./utility/getFileName";
//const express = require('express')
const app = express();
const port = 3000;
// const widths: number[] = [];
// const heights: number[] = [];
const rootFolder: string = path.resolve(__dirname);
const optimizedImgPath = rootFolder + "/public/img/optimized/";
const originalImgPath = rootFolder + "/public/img/original/";
let accessibleFile = "";

app.use(express.static(rootFolder));

const processImage = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const filename = async () => {
    await getFileName
      .getExactFileByName(originalImgPath, `${req.query.filename}`)
      .then((files) => {
        files.forEach((file) => {
          try {
            const fullPath = originalImgPath + file;
            if (
              fs.existsSync(
                optimizedImgPath +
                  `${path.parse(fullPath).name}_${req.query.width}_${
                    req.query.height
                  }.${path.parse(fullPath).ext}`
              )
            ) {
              console.log("File Exists");
              accessibleFile =
                optimizedImgPath +
                `${path.parse(fullPath).name}_${req.query.width}_${
                  req.query.height
                }.${path.parse(fullPath).ext}`;
            } else {
              imgProcessing(
                originalImgPath +
                  `${req.query.fileName}.${path.parse(fullPath).ext}`,
                optimizedImgPath +
                  path.parse(fullPath).name +
                  `_${req.query.width}_${req.query.height}.${
                    path.parse(fullPath).ext
                  }`,
                width,
                height
              );
              accessibleFile = fullPath;
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

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(rootFolder + "/public/displayImage.html");
});

app.use(processImage);

app.get("/api/images", (req: express.Request, res: express.Response) => {
  // console.log(widths);
  // widths.push(Number(req.query.width));
  // heights.push(Number(req.query.height));
  try {
    if (Object.keys(req.query).length < 1) {
      res.sendFile(rootFolder + `/public/img/original/coffee_cup.png`);
    } else {
      res.sendFile(accessibleFile);
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
