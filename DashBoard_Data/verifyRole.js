require("dotenv").config()
const admin_role = process.env.Admin_Role


function verifyRole(req, res, next) {

    // Check Role
    if (!req.headers.role) {
        return res.status(402).send("Role missing")
    }

    // Check Admin Role
    if (req.headers.role == admin_role) {
        next()
    } else {
        res.status(400).send("I'm sorry, you do not have permission for this route")
    }
};

module.exports = verifyRole;

