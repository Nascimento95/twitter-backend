const express = require("express")
const app = express()
const {sameNameAndEmail} = require('../middlewares/userSignup')
// const Tweet = require("../models/Tweet")
const User = require("../models/User")
// const Comment = require("../models/Comment")

// route qui crée un utilisateur avec un middlewares qui permet
// de savoir si name et email existe deja en base de donnée
app.post('/',sameNameAndEmail, async (req, res) => {
    try {
        const user = new User({
            ...req.body
        })
        user.save((err, user) => {
            if(user) {
                res.json(user)
                return
            }
            console.log(err)
            res.status(500).json({ error: err })
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})
// route qui permet de voir les utilisateurs
app.get('/', async (req, res) => {
    try {
        const users = await User.find().exec()
        res.json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
            .populate("tweets")    
            .exec()
        res.json(user)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
})

app.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate(
            {_id : id},
            {...req.body},
            {new: true}
        ).exec()

        res.json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params

    try {
        await User.deleteOne({_id: id}).exec()
        res.json({success : 'User deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
})

module.exports = app