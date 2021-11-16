"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
mongoose_1.default.connect(process.env.DB_CONNECTION)
    .then(function () { return console.log("db connection successful"); })
    .catch(function (err) { return console.log(err); });
app.listen(PORT, function () { return console.log("Server running"); });
