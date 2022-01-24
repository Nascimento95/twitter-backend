const express = require("express")
const app = express()
const {verifyUser} = require('../middlewares/verifyUser')
const { populate } = require("../models/Tweet")
const Tweet = require ("../models/Tweet")
const User = require ("../models/User")
// route qui crée un tweet 
app.post("/",verifyUser, async (req, res) => {
    // 1ere méthode
    // on crée un nouveau tweet avec le model tweet
    const tweet = new Tweet({
        ...req.body
    }) 
    
    
    
    tweet.save(async (err, tweet) => {
          // si il y a une erreur 
        if (err) {
          res.status(500).json({ error: err })
          return
        }

        await User.updateOne({_id:tweet.author},{ $push:{tweets:tweet._id.valueOf()}})
          //sinon tu me renvoie le tweet (l'objet) crée
        res.json(tweet)
    })
})

// Créer une route qui permet d'afficher les tweets BACKEND
app.get("/", async (req, res) => {
    try {
        const tweet = await Tweet.find()
        .populate({
            path : 'comments',
            select: 'content author createdAt updatedAt'
        })
        .populate({
            path: 'author',
            select: 'name pseudo'
            
        })
        .exec()
        res.json(tweet)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// route qui retoune les tweet des gens que je suis
app.get("/feed",async (req, res) => {
   
    if (req.user) {
        let arrayFollowing = req.user.following.map(follo => follo._id.valueOf())
        arrayFollowing = [
            ...arrayFollowing,
            req.user._id
        ]
        // nous retoune tous les tweet grace a fin le $in est comme le include
        const feed = await Tweet.find({author: {$in : arrayFollowing}}).populate('author')
        res.json(feed)
    } else {
        const feed = await Tweet.find().populate('author')
        res.json(feed)
    }
    
})

app.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const tweet = await Tweet.findById(id)
        .populate({
            path : 'comments',
            select: 'content author createdAt updatedAt',
            populate : {
                path : 'author',
                select: 'name pseudo'
            }
        })
        .populate({
            path: 'author',
            select: 'name pseudo'
            
        })
        .exec()
        res.json(tweet)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
})

// route qui permet de supprimer un tweet
app.delete("/:id",verifyUser, async (req, res) => {
    const { id } = req.params

    try {
        // on utilise la methode de mongoose deleteOne avec la comparaison 
        // qui lui permet de cibler le bonne élément 
        await Tweet.findOneAndDelete({ _id: id }).exec()
        res.status(200).json({ success: "tweet deleted" })
    } catch(err) {
        res.status(500).json({ error: err })
    }
})

module.exports = app