import express from "express"
import { findConfigFile } from "typescript";
import User from "../models/user.js";

const bcrypt = require("bcrypt");

export const router = express.Router();

//register user
router.post("/register", async (req, res) => {

    try {
        const existingUser = await User.findOne({username: req.body.createUsername})

        if (existingUser) {
            res.status(400).json({message: "username taken"})
        } else {
            const salt = await bcrypt.genSalt(12);

            const hashedPassword = await bcrypt.hash(req.body.createPassword, salt);

            const newUser = new User({
                email: req.body.createEmail,
                username: req.body.createUsername,
                password: hashedPassword,
            })

            console.log("new user created", newUser)

            const user = await newUser.save();
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found.")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Incorrect password.");
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
})