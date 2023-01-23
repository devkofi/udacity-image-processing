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
var resizeImage_1 = __importDefault(require("./utility/resizeImage"));
var getFileName_1 = __importDefault(require("./utility/getFileName"));
//const express = require('express')
var app = (0, express_1.default)();
var port = 3000;
// const widths: number[] = [];
// const heights: number[] = [];
var rootFolder = path_1.default.resolve(__dirname);
var optimizedImgPath = rootFolder + path_1.default.normalize("/public/img/optimized/");
var originalImgPath = rootFolder + path_1.default.normalize("/public/img/original/");
var file = fs_1.default.readdirSync(originalImgPath)[0];
var accessibleFile = "";
app.use(express_1.default.static(rootFolder));
var processImage = function (req, res, next) {
    var width = Number.parseInt("".concat(req.query.width)) < 10 ? 10 : Number.parseInt("".concat(req.query.width));
    var height = Number.parseInt("".concat(req.query.height)) < 10 ? 10 : Number.parseInt("".concat(req.query.height));
    var name = req.query.name;
    if (Object.keys(req.query).length < 1) {
        accessibleFile =
            originalImgPath + "".concat(path_1.default.parse(file).name).concat(path_1.default.parse(file).ext);
        res.sendFile(accessibleFile);
    }
    else if (typeof name === 'undefined' || typeof width === 'undefined' || typeof height === 'undefined') {
        //res.sendFile(accessibleFile);
        res.send("<h1> ERROR!!!</h1>\n              <ol>\n                <li><p>Please provide these three(3) query fields: <em><b>name</b></em>, <em><b>width</b></em> and <em><b>height</b></em></p></li>\n                <li><p><em><b>name</b></em> should contain the name of the file in the original img folder</p></li>\n                <li><p><em><b>height</b></em> should not be less than or equal to 0 and it should also not be a text</p></li>\n                <li><p><em><b>width</b></em> should not be less than or equal to 0 and it should also not be a text</p></li>\n              </ol>\n              ");
    }
    else if (name !== path_1.default.parse(file).name) {
        res.send("\n            <h1> ERROR!!!</h1>\n            <p>Name of the file does not exist. Please provide a correct file name</p>\n    \n    ");
    }
    else {
        var filename = function () {
            getFileName_1.default
                .getExactFileByNameAsync(originalImgPath, "".concat(name))
                .then(function (files) {
                files.forEach(function (file) {
                    try {
                        var fullPath = originalImgPath + file;
                        if (fs_1.default.existsSync(optimizedImgPath +
                            "".concat(name, "_").concat(req.query.width, "_").concat(req.query.height, ".").concat(path_1.default.parse(fullPath).ext))) {
                            console.log("File Exists");
                            accessibleFile =
                                optimizedImgPath +
                                    "".concat(path_1.default.parse(fullPath).name, "_").concat(width, "_").concat(height, ".").concat(path_1.default.parse(fullPath).ext);
                        }
                        else {
                            if (!fs_1.default.existsSync(optimizedImgPath)) {
                                fs_1.default.mkdirSync(optimizedImgPath);
                            }
                            (0, resizeImage_1.default)(originalImgPath +
                                "".concat(req.query.name).concat(path_1.default.parse(fullPath).ext), optimizedImgPath +
                                req.query.name +
                                "_".concat(width, "_").concat(height).concat(path_1.default.parse(fullPath).ext), width, height);
                            accessibleFile =
                                optimizedImgPath +
                                    "".concat(path_1.default.parse(fullPath).name, "_").concat(width, "_").concat(height).concat(path_1.default.parse(fullPath).ext);
                            console.log("After Processing Image: " + accessibleFile);
                        }
                    }
                    catch (err) {
                        res.redirect("/api/images");
                    }
                });
            });
        };
        filename();
        next();
    }
};
var accessImage = function (req, res, next) {
    accessibleFile =
        optimizedImgPath +
            "".concat(path_1.default.parse(file).name, "_").concat(req.query.width, "_").concat(req.query.height).concat(path_1.default.parse(file).ext);
    next();
};
app.get("/", function (req, res) {
    res.sendFile(rootFolder + "/public/displayImage.html");
});
app.use(processImage);
app.use(accessImage);
app.get("/api/images", function (req, res) {
    try {
        // if (Object.keys(req.query).length < 1) {
        //   accessibleFile =
        //     originalImgPath + `${path.parse(file).name}${path.parse(file).ext}`;
        //   res.sendFile(accessibleFile);
        // } else {
        //   console.log("AccessibleFile: " + accessibleFile);
        //   const display = async (): Promise<void> => {
        //     const myPromise = new Promise((resolve) => {
        //       resolve(
        //         setTimeout(() => {
        //           res.sendFile(accessibleFile);
        //         }, 100)
        //       );
        //     });
        //     await myPromise;
        //   };
        //   display();
        // }
        console.log("AccessibleFile: " + accessibleFile);
        var display = function () { return __awaiter(void 0, void 0, void 0, function () {
            var myPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        myPromise = new Promise(function (resolve) {
                            resolve(setTimeout(function () {
                                res.sendFile(accessibleFile);
                            }, 100));
                        });
                        return [4 /*yield*/, myPromise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        display();
    }
    catch (err) {
        console.error("Unimaginable Error");
    }
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
exports.default = app;
