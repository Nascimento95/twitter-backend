const express = require ("express")
const app = express()
const Comment = require("../models/Comment")
const User = require ("../models/User")

const express = require("express")
const app = express()

// Route pour creer un commentaire et ajouter un commentaire 
app.post('/', async (req, res) => {
    const { author, content , tweet } = req.body
    console.log("valeur de author =>",author);
    try {
      const comment = new Comment({ ...req.body })
      const commentInsered = await comment
        // console.log(" comment insered",commentInsered);
      let user = await User.findById(author)
      // console.log("user find id",user);
      user.comments.push(commentInsered._id)
      // console.log("user apres le push",user);
      await user.save()
      await commentInsered.save()
      // quand la route tweet  sera cree faudra mettre  id du tweet dans dans la clef tweet de comments
      // const tweet = User.findById(author)
      // console.log("trouver le tweet",tweet);
    //   user.comments.push(commentInsered.id)
    //   await tweet.save()

      res.json(commentInsered)
    }catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
})
  
  // Effacer un commentaire => DELETE 
app.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Comment.deleteOne({ _id: id }).exec()
    res.json({ success: 'Comment deleted' })
   
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app



