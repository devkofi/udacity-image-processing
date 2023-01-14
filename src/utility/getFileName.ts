import path from "path";
import { readdir } from "fs/promises";

const getExactFileByName = async (
  directory: string,
  fileName: string
): Promise<string[]> => {
  const matchedFiles = [];

  const listOfFiles = await readdir(directory);

  for (const file of listOfFiles) {
    const filename = path.parse(file).name;

    if (filename === fileName) {
      matchedFiles.push(file);
    }
  }

  return matchedFiles;
};

const getFileNameByPattern = async (
  directory: string,
  fileName: string
): Promise<string[]> => {
  const matchedFiles = [];

  const listOfFiles = await readdir(directory);

  for (const file of listOfFiles) {
    if (file.startsWith(fileName)) {
      matchedFiles.push(file);
    }
  }

  return matchedFiles;
};

const getExtension = function(directory: string,
  fileName: string): string {
    const filename = getExactFileByName(directory, fileName);
    let extension = "";
    filename.then((files) => {
      files.forEach((file) => {
        
        try {
          const tempPath = directory + file;
          extension = path.parse(tempPath).ext;
        } catch (err) {
          console.error(err);
        }
      });
      
    });
    return extension;
}

export default { getExactFileByName, getFileNameByPattern, getExtension };
