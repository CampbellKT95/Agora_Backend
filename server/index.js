"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var users_js_1 = require("./routes/users.js");
var auth_js_1 = require("./routes/auth.js");
dotenv_1.default.config();
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
mongoose_1.default.connect(process.env.DB_CONNECTION)
    .then(function () { return console.log("db connection successful"); })
    .catch(function (err) { return console.log(err); });
// middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
//routes
app.use("/api/users", users_js_1.router);
app.use("/api/auth", auth_js_1.router);
app.listen(PORT, function () { return console.log("Server running"); });
