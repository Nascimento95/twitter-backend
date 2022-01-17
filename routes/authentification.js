const express = require("express")
const app = express()
// import de la config passport faite 
const passport = require('../config/passport')

// route qui permet de ce login 
app.post("/login", passport.authenticate("local"), (req, res) => {
    // console.log("la reponse de ma route login",req.user);
    // on va connecter l'utilisateur trouver dans passport  si il se connecte bien
    if (req.user) {
        // function de passport qui permet de le login et qui va le faire persister
        req.logIn(req.user, err =>{
            if(err) {
                console.log(err);
            } else {

                res.json(req.user)
            }
        })
    }
})
//  route qui permet d avoir accés au contenur apres la connection (test)
// cette route me montre que je sui connecter sinon jai pas acces au doné
app.get("/", async (req, res) => {
    const {user} =  req
    const users = await user.find()
    // si je suis connecter tu me renvoi l'utilisateur connecter
    // sinon une erreur pas autorizé
    if (user) {
        res.json(users)
    } else {
        res.status(401).json({ error: "Unauthorized"})
    }
    // console.log("route hahah",users);
})
module.exports = app