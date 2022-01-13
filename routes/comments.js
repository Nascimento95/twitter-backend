const express = require("express")
const app = express()

const Comment = require("../models/Comment")
const User = require ("../models/User")

// Route pour creer un commentaire et ajouter un commentaire 
app.post('/', async (req, res) => {
    // const { author, content , tweet } = req.body
  
    try {
      const comment = await new Comment ({ ...req.body })
      
      comment.save(async (err, comment) => {
        if (comment) {
          
      
          const user = await User.findById(author)
                .comments.push(comment._id)
                .save()
  
          res.json(comment)
          return
        }
        console.log(err)
      res.status(500).json({ error: err })
    })
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



