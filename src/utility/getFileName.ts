import path from "path";
import { readdir } from "fs/promises";
import { readdirSync } from "fs";

/**
 * @description This is a function that gets the filename
 * @param directory Gets the directory where the file is located
 * @param fileName Gets the filename
 * @returns string[]
 */
const getExactFileByName = (directory: string, fileName: string): string[] => {
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

/**
 * @description This is an asynchronous function that gets the filename
 * @param directory Gets the directory where the file is located
 * @param fileName Gets the filename
 * @returns string[]
 */
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

/**
 * @description This is a function that gets the filename based on a pattern
 * @param directory Gets the directory where the file is located
 * @param fileName Gets the filename
 * @returns string[]
 */
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

/**
 * @description This is an asynchronous function that gets the filename based on a pattern
 * @param directory Gets the directory where the file is located
 * @param fileName Gets the filename
 * @returns string[]
 */
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

export default {
  getExactFileByName,
  getFileNameByPattern,
  getExactFileByNameAsync,
  getFileNameByPatternAsync,
};
