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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var post_1 = __importDefault(require("../models/post"));
var user_1 = __importDefault(require("../models/user"));
exports.router = express_1.default.Router();
//create post
exports.router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPost, savedPost, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPost = new post_1.default(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newPost.save()];
            case 2:
                savedPost = _a.sent();
                res.status(200).json(savedPost);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//update post
exports.router.put("/:id/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!(post.userId === req.body.data.userId)) return [3 /*break*/, 3];
                return [4 /*yield*/, post.updateOne({ $set: { content: req.body.data.content } })];
            case 2:
                _a.sent();
                res.status(200).json("Post updated");
                return [3 /*break*/, 4];
            case 3:
                res.status(403).json("You cannot update someone else's post");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//delete post
exports.router.delete("/:id/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                console.log("body", req.body);
                if (!(post.userId === req.body.userId)) return [3 /*break*/, 3];
                return [4 /*yield*/, post.deleteOne()];
            case 2:
                _a.sent();
                res.status(200).json("Post deleted");
                return [3 /*break*/, 4];
            case 3:
                res.status(403).json("You cannot delete someone else's post");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(500).json(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//like a post
exports.router.put("/:id/like", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!!post.likes.includes(req.body.userId)) return [3 /*break*/, 3];
                return [4 /*yield*/, post.updateOne({ $push: { likes: req.body.userId } })];
            case 2:
                _a.sent();
                res.status(200).json("Post liked");
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, post.updateOne({ $pull: { likes: req.body.userId } })];
            case 4:
                _a.sent();
                res.status(200).json("Removed your like");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_4 = _a.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
//comment on a post
exports.router.put("/:id/comment", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                return [4 /*yield*/, post.updateOne({ $push: { comments: { author: req.body.author, comment: req.body.comment } } })];
            case 2:
                _a.sent();
                res.status(200).json("Comment made");
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//fetch post
exports.router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(500).json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//fetch all of a user's posts
exports.router.get("/:userId/personal", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var desiredUserPosts, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default.find({ userId: req.params.userId })];
            case 1:
                desiredUserPosts = _a.sent();
                desiredUserPosts.sort(function (a, b) {
                    return b.createdAt - a.createdAt;
                });
                res.status(200).json(desiredUserPosts);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(500).json(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//fetch trending posts
exports.router.get("/all/trending", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trendingPosts, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default.find()];
            case 1:
                trendingPosts = _a.sent();
                trendingPosts.sort(function (a, b) {
                    return b.likes.length - a.likes.length;
                });
                res.status(200).json(trendingPosts);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.status(500).json(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//fetch timeline posts
exports.router.get("/timeline/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postArray, currentUser, userPosts, friendPosts, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postArray = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_1.default.findById(req.params.userId)];
            case 2:
                currentUser = _a.sent();
                return [4 /*yield*/, post_1.default.find({ userId: currentUser._id })];
            case 3:
                userPosts = _a.sent();
                userPosts.sort(function (a, b) {
                    return b.createdAt - a.createdAt;
                });
                return [4 /*yield*/, Promise.all(currentUser.following.map(function (friendId) {
                        return post_1.default.find({ userId: friendId });
                    }))];
            case 4:
                friendPosts = _a.sent();
                friendPosts.sort(function (a, b) { return b.createdAt - a.createdAt; });
                res.status(200).json(userPosts.concat.apply(userPosts, friendPosts));
                return [3 /*break*/, 6];
            case 5:
                err_9 = _a.sent();
                res.status(500).json(err_9);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
