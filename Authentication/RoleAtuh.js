const express = require("express")
const route = express.Router()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret_key_token = process.env.tokenSecret_key
const secret_key_dashboard = process.env.secret_key_of_dashboard


// User Schema 
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    role: String,
    secret_key: String
})


// User Model
const userModel = new mongoose.model("users", userSchema)


// Sign UP Route
route.post("/signup", async (req, res) => {

    try {


        const user = new userModel({
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
            secret_key: req.body.secret_key
        })


        // Check Validation
        if (!req.body.name ||
            !req.body.password ||
            !req.body.role ||
            !req.body.secret_key) {
            return res.status(403).send("Invalid Request")
        }


        // check Secret Key
        if (req.body.secret_key !== process.env.secret_key_of_dashboard) {
           return res.status(405).send("Secrect Key Incorrect")
        }

        // Check User Exist
        const userExist = await userModel.findOne({ name: req.body.name })
        if (userExist) {
            return res.status(400).send("User Already Exist")
        }


        const output = await user.save()


        // jsonwebtoken 
        const token = await jwt.sign({ user }, secret_key_token)

        res.status(200).json({ msg: "Sign up Sucessfully", output, token })


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internel Server Error ", error })
    }


})



// Sign In Route 
route.post("/signin", async (req, res) => {


    try {

        // Check Validation
        if (!req.body.name ||
            !req.body.password ||
            !req.body.role ||
            !req.body.secret_key
        ) {
            return res.status(403).send("Invalid Request")
        }



        // Check User Exist
        const userExist = await userModel.findOne({ name: req.body.name })
        if (!userExist) {
            return res.status(400).send("User Not Found")
        }

        // Check password 
        if (req.body.password !== userExist.password) {
            return res.status(400).send("Password Icorrect")
        }

        // Check Roles
        if (req.body.role !== userExist.role) {
            return res.status(400).send("Your Role Incorrect")
        }


        // Check Secrect Key
        if (req.body.secret_key !== userExist.secret_key) {
            return res.status(400).send("Incoreect Secret Key")
        }


        // jsonwebtoken 
        const token = await jwt.sign({ userExist }, secret_key_token)

        // Final Response
        res.status(200).json({ msg: "Login successfully", userExist, token })


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Interne Server Error " }, error)
    }
})



module.exports = route