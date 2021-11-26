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
    comments: [{
        author: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
},
{timestamps: true}
);

const Post = mongoose.model("Post", PostSchema)

export default Post;