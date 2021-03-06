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
        while (_) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var bcrypt = require("bcrypt");
var user_1 = __importDefault(require("../models/user"));
exports.router = express_1.default.Router();
//update user
exports.router.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, _a, err_1, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.body.userId === req.params.id || req.body.isAdmin)) return [3 /*break*/, 9];
                if (!req.body.password) return [3 /*break*/, 5];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, bcrypt.genSalt(12)];
            case 2:
                salt = _b.sent();
                _a = req.body;
                return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
            case 3:
                _a.password = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json(err_1)];
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, user_1.default.findByIdAndUpdate(req.params.id, { $set: req.body })];
            case 6:
                user = _b.sent();
                res.status(200).json(user);
                return [3 /*break*/, 8];
            case 7:
                err_2 = _b.sent();
                res.status(50).json(err_2);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9: return [2 /*return*/, res.status(403).json("You cannot update another's account")];
            case 10: return [2 /*return*/];
        }
    });
}); });
//delete user
exports.router.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.body.userId === req.params.id || req.body.isAdmin)) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findByIdAndDelete({ _id: req.params.id })];
            case 2:
                user = _a.sent();
                res.status(200).json("Account deleted successfully");
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(500).json(err_3);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(403).json("You cannot delete another's account")];
            case 6: return [2 /*return*/];
        }
    });
}); });
//fetch user by id
exports.router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, password, updatedAt, others, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log(req.params.id);
                return [4 /*yield*/, user_1.default.findById({ _id: req.params.id })];
            case 1:
                user = _b.sent();
                _a = user._doc, password = _a.password, updatedAt = _a.updatedAt, others = __rest(_a, ["password", "updatedAt"]);
                res.status(200).json(others);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//fetch user by username
exports.router.get("/find/:username", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var soughtUser, userInfo, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.find({ username: req.params.username })];
            case 1:
                soughtUser = _a.sent();
                userInfo = [{
                        soughtUsername: soughtUser[0].username,
                        soughtId: soughtUser[0]._id
                    }];
                res.status(200).json(userInfo);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.put("/:id/follow", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, currentUser, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.body.userId !== req.params.id)) return [3 /*break*/, 12];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 10, , 11]);
                return [4 /*yield*/, user_1.default.findById(req.params.id)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, user_1.default.findById(req.body.userId)];
            case 3:
                currentUser = _a.sent();
                if (!!user.followers.includes(req.body.userId)) return [3 /*break*/, 6];
                return [4 /*yield*/, user.updateOne({ $push: { followers: req.body.userId } })];
            case 4:
                _a.sent();
                return [4 /*yield*/, currentUser.updateOne({ $push: { following: req.params.id } })];
            case 5:
                _a.sent();
                res.status(200).json(user);
                return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, user.updateOne({ $pull: { followers: req.body.userId } })];
            case 7:
                _a.sent();
                return [4 /*yield*/, currentUser.updateOne({ $pull: { following: req.params.id } })];
            case 8:
                _a.sent();
                res.status(200).json(user);
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                err_6 = _a.sent();
                res.status(500).json(err_6);
                return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 13];
            case 12:
                res.status(403).json("Cannot follow self");
                _a.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); });
//unfollow user
// router.put("/:id/unfollow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             if (user.followers.includes(req.body.userId)) {
//                 await user.updateOne({$pull: {followers: req.body.userId}});
//                 await currentUser.updateOne({$pull: {following: req.params.id}})
//                 res.send(200).json("User unfollowed");
//             } else {
//                 res.status(403).json("You are already don't follow this person")
//             }
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     } else {
//         res.status(403).json("Cannot follow self")
//     }
// });
