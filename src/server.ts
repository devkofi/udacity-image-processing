import express from "express";
import sharp from "sharp";
import fs from "fs";
//const express = require('express')
const app = express()
const port = 3000
const widths: number[] = [];
const heights: number[] = [];
const absolutePath: string = __dirname;


app.use(express.static(absolutePath));

const imageProcessing = function (req: express.Request, res: express.Response, next:express.NextFunction) {
  const width = req.query.width;
  const height = req.query.height;
  const filepath = absolutePath + `/img/optimized/${req.query.filename}.png`;
  try {
    if (fs.existsSync(filepath)) {
      for(let i=0; i<=widths.length; i++){
        if(!(widths[i]===Number(req.query.width) && heights[i]===Number(req.query.height)))
        {
          sharp(absolutePath + `/img/original/${req.query.filename}.png`)
            .resize(Number(width), Number(height))
            .toFile(absolutePath + `/img/optimized/${req.query.filename}.png`, function(err) {
              console.log(err)
          });
        }
      }
      
    }
    else{
      sharp(absolutePath + `/img/original/${req.query.filename}.png`)
        .resize(Number(width), Number(height))
        .toFile(absolutePath + `/img/optimized/${req.query.filename}.png`, function(err) {
          console.log(err)
      });
    }
  } catch(err) {
    console.error(err)
  }
  next()
}

app.use(imageProcessing)

app.get('/', (req: express.Request, res: express.Response)=>{
  res.sendFile(absolutePath + "/displayImage.html")
});

app.get('/api/images', (req: express.Request, res: express.Response)=>{
  console.log(widths);
  widths.push(Number(req.query.width));
  widths.push(Number(req.query.height));
  try {
    if(Object.keys(req.query).length < 1)
    {
      res.sendFile(absolutePath + "/img/original/coffee_cup.png")
    }
    else{
      res.sendFile(absolutePath + `/img/optimized/${req.query.filename}.png`)
    }
  } catch(err) {
    console.error(err)
  }
  
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;