import express from "express"
const bcrypt = require("bcrypt");
import User from "../models/user";
export const router = express.Router();


//update user
router.put("/:id", async (req, res) => {

    //potential error with req.body.isAdmin; shown as req.user
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        console.log("ids match")

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
            res.status(200).json("Account updated")
        } catch (err) {
            res.status(50).json(err);
        }
    } else {
        return res.status(403).json("You cannot update another's account")
    }
})
//delete user
//fetch user
//follow user
//unfollow user