import sharp from "sharp";

const imageProcessing = function (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): void {
  sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath, function (err: Error) {
      console.log(err);
    });
};

export default imageProcessing;
