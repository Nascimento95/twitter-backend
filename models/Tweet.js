const { Schema, model } = require("mongoose")

const TweetSchema = Schema({
  content : {
    type : String,
    maxlength : 280
  },
  author : {type : Schema.Types.ObjectId, ref:"User" },
  comments : [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  retweets : [{ type: Schema.Types.ObjectId, ref: "User" }],
},{
    timestamps: true,
  })


const Tweet = model('Tweet', TweetSchema)

module.exports = Tweet