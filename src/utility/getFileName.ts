import path from "path";
import { readdir } from "fs/promises";


const getExactFileByName = async (directory: string, fileName: string): Promise<string[]> =>{
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

const getFileNameByPattern = async (directory: string, fileName: string): Promise<string[]> =>{
    const matchedFiles = [];

    const listOfFiles = await readdir(directory);

    for (const file of listOfFiles) {
        
        if (file.startsWith(fileName)) {
            matchedFiles.push(file);
        }
    }

    return matchedFiles;
};



export default {getExactFileByName, getFileNameByPattern}