"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
//const express = require('express')
var app = (0, express_1.default)();
var port = 3000;
var widths = [];
var heights = [];
var absolutePath = __dirname;
app.use(express_1.default.static(absolutePath));
var imageProcessing = function (req, res, next) {
    var width = req.query.width;
    var height = req.query.height;
    var filepath = absolutePath + "/img/optimized/".concat(req.query.filename, ".png");
    try {
        if (fs_1.default.existsSync(filepath)) {
            for (var i = 0; i <= widths.length; i++) {
                if (!(widths[i] === Number(req.query.width) && heights[i] === Number(req.query.height))) {
                    (0, sharp_1.default)(absolutePath + "/img/original/".concat(req.query.filename, ".png"))
                        .resize(Number(width), Number(height))
                        .toFile(absolutePath + "/img/optimized/".concat(req.query.filename, ".png"), function (err) {
                        console.log(err);
                    });
                }
            }
        }
        else {
            (0, sharp_1.default)(absolutePath + "/img/original/".concat(req.query.filename, ".png"))
                .resize(Number(width), Number(height))
                .toFile(absolutePath + "/img/optimized/".concat(req.query.filename, ".png"), function (err) {
                console.log(err);
            });
        }
    }
    catch (err) {
        console.error(err);
    }
    next();
};
app.use(imageProcessing);
app.get('/', function (req, res) {
    res.sendFile(absolutePath + "/displayImage.html");
});
app.get('/api/images', function (req, res) {
    console.log(widths);
    widths.push(Number(req.query.width));
    widths.push(Number(req.query.height));
    try {
        if (Object.keys(req.query).length < 1) {
            res.sendFile(absolutePath + "/img/original/coffee_cup.png");
        }
        else {
            res.sendFile(absolutePath + "/img/optimized/".concat(req.query.filename, ".png"));
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
