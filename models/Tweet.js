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

TweetSchema.post('findOneAndDelete', async function(tweet) {
 await model('User').findOneAndUpdate(
    {_id: tweet.author},
    {$pull:{tweets:tweet._id}}
  )

  console.log(tweet);
})





const Tweet = model('Tweet', TweetSchema)

module.exports = Tweet