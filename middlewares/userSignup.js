// const req = require("express/lib/request")
let Users = require("../models/User")

const sameNameAndEmail = async (req, res, next) => {
    const { name, email } = await req.body
    console.log(req.body);
    // des que je met de clef pour vérifier sa marche pas find ou meme findOne
    const checkNameAndEmail = await Users.findOne({email: email})
    console.log("log middleware",checkNameAndEmail);
    if (checkNameAndEmail) {
        res.status(401).json("email déja utiliser")
    } else {
        next()
    }
}
module.exports = {
    sameNameAndEmail
}