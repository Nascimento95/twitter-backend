// const req = require("express/lib/request")
let Users = require("../models/User")

const sameNameAndEmail = (req, res, next) => {
    const { name, email } = req.body
    const checkNameAndEmail = Users.find(user => user.name === username || user.email === email)
    if(checkNameAndEmail) {
        res.status(401).json("nom utilisateur et email déja utiliser")
    } else {
        next()
    }
}
module.exports = {
    sameNameAndEmail
}