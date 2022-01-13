const { Schema, model } = require("mongoose")

const CommentSchema = Schema({
  content :  { type : String },
  author : { type : Schema.Types.ObjectId, ref:"User" },

  tweet : { type: Schema.Types.ObjectId, ref: "Tweet" },

  
},{
  timestamps: true,
})


const Comment= model('Comment', CommentSchema)

module.exports = Comment