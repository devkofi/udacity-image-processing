import sharp from "sharp";

/**
 * @description This processes the image for resizing
 * @param inputPath Gets the input path
 * @param outputPath Gets the output path where the file will be stored
 * @param width Gets the width for the image to be resized
 * @param height Gets the height for the image to be resized
 */
const resizeImage = function (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): void {
  sharp(inputPath)
    .resize(Number(width), Number(height))
    .toFile(outputPath, function (err: Error) {
      console.log(err);
    });
};

export default resizeImage;
