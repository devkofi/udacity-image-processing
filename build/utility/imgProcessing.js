"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var imgProcessor = function (inputPath, outputPath, width, height) {
    (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFile(outputPath, function (err) {
        console.log(err);
    });
};
exports.default = imgProcessor;
