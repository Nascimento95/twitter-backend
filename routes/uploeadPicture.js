const express = require("express")
const app = express()
const fs = require("fs")
const multer = require("multer")
const moment = require("moment")
// import du package multer
const User = require ("../models/User")
//Confuguration doit etre tout seul
const upload = multer({ dest: 'public' })



app.post( // Permet de cree une route avec la methode post
    '/:id/file', // Chemin de route avec param dynamique qui se nomme id
    upload.single('photo'), // Middlware de multer qui permet de telecharge des photos 
    async (req, res) => // Fonction Call back asyncrohone qui prend deux parametres 
    {
        const { id } = req.params // Recuperer mes parametre dynamique
        try {  // Essayer ceux code 
            const user = await User.findById(id).exec() // Je cherche un User dans la base de donnée avec son Id puis je le stocke dans une Constante
    
            const time = moment().format("DD-MM-YYYY-hh-mm-ss") // Formatage d'une date et je la stock apres dans ma constante time
            
            const photoName = `${user.name}-${time}.jpg` // Construction du nom de la photo , puis la stocker dans une constante
            // console.log(photoName);
            fs.renameSync(req.file.path, `public/${photoName}`) // Modification du nom du fichier 
        
            user.profilePicture  = `http://localhost:5000/${photoName}` // Modification de la clef profil user
            await user.save()    // Je sauvegarde la modification dans la base de donnée

            res.json({  // Je retourne une reponse sous format Json 
                profilePicture:user.profilePicture   
            })
        }catch (err) { // En cas d'erreure je l'attrape et je la stocke dans le parametre erreur
            console.log(err)
            res.status(500).json({ error: err }) // Je retourne une erreur sous format Json avec un statut .
        }
})

module.exports = app  // j'exporte mon app pour qu'elle soit utilisé par tout .
