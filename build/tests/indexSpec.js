"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
describe("Suite for function calls", function () {
    it("Return a number from a function", function () {
        expect((0, index_1.default)(20)).toEqual(20);
    });
});
