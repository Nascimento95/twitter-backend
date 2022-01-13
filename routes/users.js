const express = require("express")
const app = express()

// const Tweet = require("../models/Tweet")
const User = require("../models/User")
// const Comment = require("../models/Comment")


app.post('/', async (req, res) => {
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
        const user = await User.findById(id).exec()
        res.json(user)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
})

module.exports = app