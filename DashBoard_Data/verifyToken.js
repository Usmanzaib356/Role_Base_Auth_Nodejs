const jwt = require("jsonwebtoken")
require("dotenv").config()
const tokenSecret_key = process.env.tokenSecret_key


function verifyToken(req, res, next,) {

  if (!req.headers.x_access_token) {
    return res.status(400).send("Token Missing")
  }

  const token = req.headers.x_access_token

  try {
    const decoded = jwt.verify(token, tokenSecret_key)

    if (decoded) {
      next()
    }

  } catch {
    res.status(400).json({ msg: "Invalid Token" })
  }
};

module.exports = verifyToken;



