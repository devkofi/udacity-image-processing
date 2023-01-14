"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var promises_1 = require("fs/promises");
var fs_1 = require("fs");
var getExactFileByName = function (directory, fileName) {
    var matchedFiles = [];
    var listOfFiles = (0, fs_1.readdirSync)(directory);
    for (var _i = 0, listOfFiles_1 = listOfFiles; _i < listOfFiles_1.length; _i++) {
        var file = listOfFiles_1[_i];
        var filename = path_1.default.parse(file).name;
        if (filename === fileName) {
            matchedFiles.push(file);
        }
    }
    return matchedFiles;
};
var getExactFileByNameAsync = function (directory, fileName) { return __awaiter(void 0, void 0, void 0, function () {
    var matchedFiles, listOfFiles, _i, listOfFiles_2, file, filename;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                matchedFiles = [];
                return [4 /*yield*/, (0, promises_1.readdir)(directory)];
            case 1:
                listOfFiles = _a.sent();
                for (_i = 0, listOfFiles_2 = listOfFiles; _i < listOfFiles_2.length; _i++) {
                    file = listOfFiles_2[_i];
                    filename = path_1.default.parse(file).name;
                    if (filename === fileName) {
                        matchedFiles.push(file);
                    }
                }
                return [2 /*return*/, matchedFiles];
        }
    });
}); };
var getFileNameByPattern = function (directory, fileName) {
    var matchedFiles = [];
    var listOfFiles = (0, fs_1.readdirSync)(directory);
    for (var _i = 0, listOfFiles_3 = listOfFiles; _i < listOfFiles_3.length; _i++) {
        var file = listOfFiles_3[_i];
        if (file.startsWith(fileName)) {
            matchedFiles.push(file);
        }
    }
    return matchedFiles;
};
var getFileNameByPatternAsync = function (directory, fileName) { return __awaiter(void 0, void 0, void 0, function () {
    var matchedFiles, listOfFiles, _i, listOfFiles_4, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                matchedFiles = [];
                return [4 /*yield*/, (0, promises_1.readdir)(directory)];
            case 1:
                listOfFiles = _a.sent();
                for (_i = 0, listOfFiles_4 = listOfFiles; _i < listOfFiles_4.length; _i++) {
                    file = listOfFiles_4[_i];
                    if (file.startsWith(fileName)) {
                        matchedFiles.push(file);
                    }
                }
                return [2 /*return*/, matchedFiles];
        }
    });
}); };
exports.default = { getExactFileByName: getExactFileByName, getFileNameByPattern: getFileNameByPattern, getExactFileByNameAsync: getExactFileByNameAsync, getFileNameByPatternAsync: getFileNameByPatternAsync };
