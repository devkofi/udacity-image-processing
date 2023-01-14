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
const optimizedImgPath = rootFolder + path.normalize("/public/img/optimized/");
const originalImgPath = rootFolder + path.normalize("/public/img/original/");
let accessibleFile = "";
let fullPath = "";

app.use(express.static(rootFolder+"/public/"));

const processImage = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const filename = getFileName
  .getExactFileByName(originalImgPath, `${req.query.filename}`);
  
  filename.then((files) => {
    files.forEach((file) => {
      try {
        fullPath = originalImgPath + file;
        if (
          fs.existsSync(
            optimizedImgPath +
              `${path.parse(fullPath).name}_${req.query.width}_${
                req.query.height
              }${path.parse(fullPath).ext}`
          )
        ) {
          console.log("File Exists");
          accessibleFile =
            optimizedImgPath +
            `${path.parse(fullPath).name}_${req.query.width}_${
              req.query.height
            }${path.parse(fullPath).ext}`;

          console.log(accessibleFile);

        } else {
          console.log("File Name: " + path.parse(fullPath).name);
          console.log("File Extension: " + path.parse(fullPath).ext);
          console.log("File Extension: " + req.query.width);
          console.log("File Extension: " + req.query.height);
          console.log(file);

          if (!fs.existsSync(optimizedImgPath)) {
            fs.mkdirSync(optimizedImgPath);
          }

          const process = async () => await Promise.resolve(imgProcessing(
            originalImgPath +
              `${req.query.filename}${path.parse(fullPath).ext}`,
            optimizedImgPath +
              path.parse(fullPath).name +
              `_${req.query.width}_${req.query.height}${
                path.parse(fullPath).ext
              }`, width,height));
          
            process();
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
    
  next();
};

const loadImage = function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction): void{

  accessibleFile = optimizedImgPath + req.query.filename + `_${req.query.width}_${req.query.height}${
  path.parse(fs.readdirSync(originalImgPath)[0]).ext}`; 
  next();
}

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(rootFolder + "/public/displayImage.html");
});

app.use(processImage);
app.use(loadImage);
app.get("/api/images", (req: express.Request, res: express.Response) => {
  
  if (Object.keys(req.query).length < 1) {
    const emptyFile = originalImgPath + req.query.filename + `${
      path.parse(fs.readdirSync(originalImgPath)[0]).ext}`; 
    res.sendFile(emptyFile);
  }

  try {
    
    if(!
      fs.existsSync(
        optimizedImgPath +
          `${req.query.filename}_${req.query.width}_${req.query.height
          }${path.parse(fullPath).ext}`
      )){
        
          let tempPath = "";
            
             tempPath = originalImgPath + path.parse(fs.readdirSync(originalImgPath)[0]).name + `_${req.query.width}_${req.query.height}${
                path.parse(fs.readdirSync(originalImgPath)[0]).ext}`;
      
          res.sendFile(tempPath);
    }
    else {
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
