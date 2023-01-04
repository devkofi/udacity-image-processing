import express from "express"
import sharp from "sharp"
import fs from "fs"
//const express = require('express')
const app = express()
const port = 3000
const widths: number[] = [];
const heights: number[] = [];
const processImage = async function(req: express.Request, res: express.Response, next:express.NextFunction){
  
  // const promiseToProcess = await new Promise((resolve, reject) => {
  //   try {
  //     resolve(sharp(__dirname + 'img/original/coffee_cup.png')
  //   .resize(300, 200)
  //   .toFile(__dirname + 'img/optimized/coffee_cup.png', function(err) {
  //     // output.jpg is a 300 pixels wide and 200 pixels high image
  //     // containing a scaled and cropped version of input.jpg
  //   }))
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  // });
  // promiseToProcess();
  await sharp(__dirname + 'img/original/coffee_cup.png')
    .resize(300, 200)
    .toFile(__dirname + 'img/optimized/coffee_cup.png', function(err) {
      // output.jpg is a 300 pixels wide and 200 pixels high image
      // containing a scaled and cropped version of input.jpg
    });
  next()
}

app.use(processImage)
// server your css as static
//app.use('/api/images', express.static(__dirname))
app.use(express.static(__dirname));

// app.get("/", (req: express.Request, res: express.Response) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/api/images", (req: express.Request, res: express.Response) => {
//   res.sendFile(__dirname + "/index.html");
// });

// const fileExist = async function(req: express.Request, res: express.Response, next:express.NextFunction){
//   const width = (req.query.width as unknown) as number;
//   const height = (req.query.height as unknown) as number;
//   const path = __dirname + `/img/original/${req.query.filename}.png`;

//   try {
//     fs.access(path, (err) => {
//       if (err) {
//         console.log("Inaccessible Operation");
//       }
//       sharp(__dirname + `/img/original/${req.query.filename}.png`)
//         .resize(width, height)
//         .toFile(__dirname + `/img/optimized/${req.query.filename}.png`, function(err) {
//           console.log(err)
//       });
//       console.log("File Exists")
//     });
    
//   } catch (error) {
//     console.log(error)
//   }
  
//   next();
// }
// app.use(fileExist);

// app.get('/', (req: express.Request, res: express.Response)=>{
  
//   //const width = (req.query.width as unknown) as number;
//   //const height = (req.query.height as unknown) as number;
//   const filepath = __dirname + `/img/${req.query.filename}.png`;

//   console.log(req.body);
//   console.log(req.query);
  
//   try {
//     fs.access(filepath, (err) => {
//       if (err) {
//         console.log("Inaccessible Operation");
//       }
//       sharp(__dirname + `/img/original/${req.query.filename}.png`)
//         .resize(300, 200)
//         .toFile(__dirname + `/img/optimized/${req.query.filename}.png`, function(err) {
//           console.log(err)
//       });
//       console.log("File Exists")
//     });
    
//   } catch (error) {
//     console.log(error)
//   }
//   //const path = __dirname + `/img/original/${req.query.filename}.png`;
//   try {
//     if (fs.existsSync(filepath)) {
//       res.sendFile(__dirname + `/img/optimized/${req.query.filename}.png`)
//     }
//     else{
//       res.send("Hello World");
//     }
//   } catch(err) {
//     console.error(err)
//   }
  
// });

app.get('/api/images', (req: express.Request, res: express.Response)=>{
  const width = req.query.width;
  const height = req.query.height;
  const filepath = __dirname + `/img/optimized/${req.query.filename}.png`;
  console.log(widths);
  widths.push(Number(req.query.width));
  widths.push(Number(req.query.height));
  try {
    if(Object.keys(req.query).length < 1)
    {
      res.send("Hello World")
    }
    if (fs.existsSync(filepath)) {
      for(let i=0; i<=widths.length; i++){
        if(widths[i]===Number(req.query.width) && heights[i]===Number(req.query.height))
        {
          res.sendFile(__dirname + `/img/optimized/${req.query.filename}.png`);
        }
        else{
          sharp(__dirname + `/img/original/${req.query.filename}.png`)
            .resize(Number(width), Number(height))
            .toFile(__dirname + `/img/optimized/${req.query.filename}.png`, function(err) {
              console.log(err)
          });
          res.sendFile(__dirname + `/img/optimized/${req.query.filename}.png`)
        }
      }
      
    }
    else{
      sharp(__dirname + `/img/original/${req.query.filename}.png`)
        .resize(Number(width), Number(height))
        .toFile(__dirname + `/img/optimized/${req.query.filename}.png`, function(err) {
          console.log(err)
      });
      res.sendFile(__dirname + `/img/optimized/${req.query.filename}.png`)
    }
  } catch(err) {
    console.error(err)
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;