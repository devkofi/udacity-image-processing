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
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var imgProcessing_1 = __importDefault(require("./utility/imgProcessing"));
var getFileName_1 = __importDefault(require("./utility/getFileName"));
//const express = require('express')
var app = (0, express_1.default)();
var port = 3000;
// const widths: number[] = [];
// const heights: number[] = [];
var rootFolder = path_1.default.resolve(__dirname);
var optimizedImgPath = rootFolder + path_1.default.normalize("/public/img/optimized/");
var originalImgPath = rootFolder + path_1.default.normalize("/public/img/original/");
var accessibleFile = "";
var fullPath = "";
app.use(express_1.default.static(rootFolder + "/public/"));
var processImage = function (req, res, next) {
    var _this = this;
    var width = Number(req.query.width);
    var height = Number(req.query.height);
    var filename = getFileName_1.default
        .getExactFileByName(originalImgPath, "".concat(req.query.filename));
    filename.then(function (files) {
        files.forEach(function (file) {
            try {
                fullPath = originalImgPath + file;
                if (fs_1.default.existsSync(optimizedImgPath +
                    "".concat(path_1.default.parse(fullPath).name, "_").concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(fullPath).ext))) {
                    console.log("File Exists");
                    accessibleFile =
                        optimizedImgPath +
                            "".concat(path_1.default.parse(fullPath).name, "_").concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(fullPath).ext);
                    console.log(accessibleFile);
                }
                else {
                    console.log("File Name: " + path_1.default.parse(fullPath).name);
                    console.log("File Extension: " + path_1.default.parse(fullPath).ext);
                    console.log("File Extension: " + req.query.width);
                    console.log("File Extension: " + req.query.height);
                    console.log(file);
                    if (!fs_1.default.existsSync(optimizedImgPath)) {
                        fs_1.default.mkdirSync(optimizedImgPath);
                    }
                    var process_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.resolve((0, imgProcessing_1.default)(originalImgPath +
                                        "".concat(req.query.filename).concat(path_1.default.parse(fullPath).ext), optimizedImgPath +
                                        path_1.default.parse(fullPath).name +
                                        "_".concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(fullPath).ext), width, height))];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); };
                    process_1();
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    });
    accessibleFile = optimizedImgPath + req.query.filename + "_".concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(fs_1.default.readdirSync(originalImgPath)[0]).ext);
    next();
};
var loadImage = function (req, res, next) {
    accessibleFile = optimizedImgPath + req.query.filename + "_".concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(fs_1.default.readdirSync(originalImgPath)[0]).ext);
    next();
};
app.get("/", function (req, res) {
    res.sendFile(rootFolder + "/public/displayImage.html");
});
app.use(processImage);
app.use(loadImage);
app.get("/api/images", function (req, res) {
    if (Object.keys(req.query).length < 1) {
        var emptyFile = originalImgPath + req.query.filename + "".concat(path_1.default.parse(fs_1.default.readdirSync(originalImgPath)[0]).ext);
        res.sendFile(emptyFile);
    }
    try {
        if (!fs_1.default.existsSync(optimizedImgPath +
            "".concat(req.query.filename, "_").concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(fullPath).ext))) {
            var tempPath = "";
            tempPath = optimizedImgPath + path_1.default.parse(fs_1.default.readdirSync(originalImgPath)[0]).name + "_".concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(fs_1.default.readdirSync(originalImgPath)[0]).ext);
            res.sendFile(tempPath);
        }
        else {
            res.sendFile(accessibleFile);
        }
    }
    catch (err) {
        console.error(err);
    }
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
exports.default = app;
