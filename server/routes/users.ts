import express from "express"
import { AnyArray } from "mongoose";
const bcrypt = require("bcrypt");
import User from "../models/user";
export const router = express.Router();


//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(12);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json(user)
        } catch (err) {
            res.status(50).json(err);
        }
    } else {
        return res.status(403).json("You cannot update another's account")
    }
});
//delete user

router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete({_id: req.params.id});
            res.status(200).json("Account deleted successfully")
        } catch (err) {
            res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You cannot delete another's account")
    }
});

//fetch user by id
router.get("/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const user = await User.findById({_id: req.params.id});
        const {password, updatedAt, ...others} = user._doc;

        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
});

//fetch user by username
router.get("/find/:username", async (req, res) => {
    try {
        const soughtUser: any = await User.find({username: req.params.username});
        
        const userInfo = [{
            soughtUsername: soughtUser[0].username,
            soughtId: soughtUser[0]._id
        }]

        res.status(200).json(userInfo);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: req.params.id}})

                res.status(200).json(user);

            } else {
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {following: req.params.id}})

                res.status(200).json(user);

            }

        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("Cannot follow self")
    }
});

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