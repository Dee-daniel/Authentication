const jwt = require ('jsonwebtoken')
const Users = require("../model/user")

//check the token
//verified

const requiredAuthProcess = (req, res, next ) => {
    //get cess to the cookie
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err,decodedToken) => {
            if (err) {
                res.redirect("/login")
            } else {
                const user = await Users.findById (decodedToken.id)
                res.locals.email = user.email
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports = requiredAuthProcess;