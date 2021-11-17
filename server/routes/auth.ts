import express from "express"
import User from "../models/user.js";

const bcrypt = require("bcrypt");

export const router = express.Router();

//register user
router.post("/register", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found.")

        //error thrown @ password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Incorrect password.");

        res.status(200).json(user);
    } catch (err) {
        console.log(err)
    }
})