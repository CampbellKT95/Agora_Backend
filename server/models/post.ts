import { truncate } from "fs";
import mongoose from "mongoose";
import { transpileModule } from "typescript";

const PostSchema = new mongoose.Schema({
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
},
{timestamps: true}
);

const Post = mongoose.model("Post", PostSchema)

export default Post;