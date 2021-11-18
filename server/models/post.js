"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PostSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        max: 500
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
}, { timestamps: true });
var Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
