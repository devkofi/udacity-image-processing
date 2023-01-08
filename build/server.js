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
var rootFolder = path_1.default.resolve("./");
var optimizedImgPath = rootFolder + "/img/optimized/";
var originalImgPath = rootFolder + "/img/original/";
var accessibleFile = "";
app.use(express_1.default.static(rootFolder));
var processImage = function (req, res, next) {
    var _this = this;
    var width = req.query.width;
    var height = req.query.height;
    var filename = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFileName_1.default.getExactFileByName(originalImgPath, "".concat(req.query.filename))
                        .then(function (files) {
                        files.forEach(function (file) {
                            try {
                                var fullPath = originalImgPath + file;
                                if (fs_1.default.existsSync(optimizedImgPath + "".concat(path_1.default.parse(fullPath).name, "_").concat(req.query.width, "_").concat(req.query.height, ".").concat(path_1.default.parse(fullPath).ext))) {
                                    console.log("File Exists");
                                    accessibleFile = optimizedImgPath + "".concat(path_1.default.parse(fullPath).name, "_").concat(req.query.width, "_").concat(req.query.height, ".").concat(path_1.default.parse(fullPath).ext);
                                }
                                else {
                                    (0, imgProcessing_1.default)(originalImgPath + "".concat(req.query.fileName, ".").concat(path_1.default.parse(fullPath).ext), optimizedImgPath + path_1.default.parse(fullPath).name + "_".concat(req.query.width, "_").concat(req.query.height, ".").concat(path_1.default.parse(fullPath).ext), width, height);
                                    accessibleFile = fullPath;
                                }
                            }
                            catch (err) {
                                console.error(err);
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    filename();
    next();
};
app.get('/', function (req, res) {
    res.sendFile(rootFolder + "/displayImage.html");
});
app.use(processImage);
app.get('/api/images', function (req, res) {
    // console.log(widths);
    // widths.push(Number(req.query.width));
    // heights.push(Number(req.query.height));
    try {
        if (Object.keys(req.query).length < 1) {
            res.sendFile(rootFolder + "/img/original/coffee_cup.png");
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
