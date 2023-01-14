"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
/**
 * @description This processes the image for resizing
 * @param inputPath Gets the input path
 * @param outputPath Gets the output path where the file will be stored
 * @param width Gets the width for the image to be resized
 * @param height Gets the height for the image to be resized
 */
var imgProcessor = function (inputPath, outputPath, width, height) {
    (0, sharp_1.default)(inputPath)
        .resize(Number(width), Number(height))
        .toFile(outputPath, function (err) {
        console.log(err);
    });
};
exports.default = imgProcessor;
