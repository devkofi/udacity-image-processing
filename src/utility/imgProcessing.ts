import sharp from "sharp";

const imageProcessing = function (path: string, width: number, height: number): void {
  
  sharp(path)
    .resize(width, height)
    .toFile(path, function(err) {
      console.log(err)
    });
}

export default imageProcessing;
