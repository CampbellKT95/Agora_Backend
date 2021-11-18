import { truncate } from "fs";
import mongoose from "mongoose";
import { transpileModule } from "typescript";

const PostSchema = new mongoose.Schema({
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
},
{timestamps: true}
);

const Post = mongoose.model("Post", PostSchema)

export default Post;