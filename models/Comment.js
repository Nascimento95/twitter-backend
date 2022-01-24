const { Schema, model } = require("mongoose")

const CommentSchema = Schema({
  content :  { type : String },
  author : { type : Schema.Types.ObjectId, ref:"User" },

  tweet : { type: Schema.Types.ObjectId, ref: "Tweet" },

  
},{
  timestamps: true,
})

CommentSchema.post('save', async function(comment) {
  console.log('Hello la poissonerie')
  await model('Tweet').findOneAndUpdate(
     {_id: comment.tweet},
     {$push:{comments:comment._id}}
   )
   console.log(comment);
})


const Comment= model('Comment', CommentSchema)

module.exports = Comment