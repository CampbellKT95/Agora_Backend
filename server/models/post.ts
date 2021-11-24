import { truncate } from "fs";
import mongoose from "mongoose";
import { transpileModule } from "typescript";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        max: 500
    },
    description: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: [String]
    }
},
{timestamps: true}
);

const Post = mongoose.model("Post", PostSchema)

export default Post;