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
//  route qui permet de rester connecté peu importe les intempéries
app.get("/me", async (req, res) => {
    // console.log(req.user)
    if (req.user) {
        res.json(req.user)
    } else {
        res.status(401).json({ error: "Unauthorized"})
    }
})
module.exports = app