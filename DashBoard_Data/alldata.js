const express = require("express")
const route = express.Router()
const verifytoken = require("./verifyToken")
const verifyRole = require("./verifyRole")

// All data oute
route.get("/data", verifytoken, verifyRole, (req, res) => {

    res.status(200).send("All data")

})




module.exports = route