const express = require("express")
const route = express.Router()
const verifytoken = require("./verifyToken")
const verifyRole = require("./verifyRole")

// All data oute
route.get("/all_data", verifytoken, verifyRole, (req, res) => {

    res.status(200).json({
        DailyRevenue: "$1000",
        NetProfit: "$200"
    })

})


route.get("/products", verifytoken, (req, res) => {
    res.status(200).json({ data: "Products" })
})




module.exports = route