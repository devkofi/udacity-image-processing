import path from "path";
import { readdir } from "fs/promises";
import { readdirSync } from "fs";


const getExactFileByName =  (
  directory: string,
  fileName: string
): string[] => {
  const matchedFiles = [];

  const listOfFiles = readdirSync(directory);

  for (const file of listOfFiles) {
    const filename = path.parse(file).name;

    if (filename === fileName) {
      matchedFiles.push(file);
    }
  }

  return matchedFiles;
};

const getExactFileByNameAsync = async (
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

const getFileNameByPattern = (
  directory: string,
  fileName: string
): string[] => {
  const matchedFiles = [];

  const listOfFiles = readdirSync(directory);

  for (const file of listOfFiles) {
    if (file.startsWith(fileName)) {
      matchedFiles.push(file);
    }
  }

  return matchedFiles;
};

const getFileNameByPatternAsync = async (
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

export default { getExactFileByName, getFileNameByPattern, getExactFileByNameAsync, getFileNameByPatternAsync};




