import express from "express"
import Post from "../models/post";
import User from "../models/user";
export const router = express.Router();

//create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)

    try {  
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (err) {
        res.status(500).json(err)
    }
})

//update post
router.put("/:id/update", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.data.userId) {

            await post.updateOne({$set: {content: req.body.data.content}});
            res.status(200).json("Post updated");

        } else {
            res.status(403).json("You cannot update someone else's post")
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

//delete post
router.delete("/:id/delete", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        console.log("body", req.body)

        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted");

        } else {
            res.status(403).json("You cannot delete someone else's post")
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

//like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("Removed your like");
        }

    } catch (err) {
        res.status(500).json(err)
    }

});

//comment on a post
router.put("/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        await post.updateOne({$push: {comments: {author: req.body.author, comment: req.body.comment}}});
        
        res.status(200).json("Comment made");

    } catch (err) {
        res.status(500).json(err)
    }

});

//fetch post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err)
    }
});

//fetch all of a user's posts
router.get("/:userId/personal", async (req: any, res) => {
    try {
        const desiredUserPosts = await Post.find({userId: req.params.userId});


        desiredUserPosts.sort(function(a: any, b: any): any {
            return b.createdAt - a.createdAt
        })

        res.status(200).json(desiredUserPosts);

    } catch (err) {
        res.status(500).json(err)
    }
});

//fetch timeline posts
router.get("/timeline/:userId", async (req, res) => {
    let postArray = [];

    try {
        const currentUser = await User.findById(req.params.userId);

        const userPosts = await Post.find({userId: currentUser._id});

        userPosts.sort(function(a: any, b: any): any {
            return b.createdAt - a.createdAt
        })

        //need to use promise.all due to using map
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId: string) => {
                return Post.find({userId: friendId});
            })
        );

        friendPosts.sort((a: any, b: any) => b.createdAt - a.createdAt)

        res.status(200).json(userPosts.concat(...friendPosts));

    } catch (err) {
        res.status(500).json(err)
    }
})

