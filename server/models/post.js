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
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        max: 500,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [{
            author: {
                type: String,
            },
            comment: {
                type: String,
            }
        }]
}, { timestamps: true });
var Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
