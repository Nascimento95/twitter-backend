const { Schema, model } = require("mongoose")

const UserSchema = Schema({
  name : {
      type : String,
      required: true,
      unique: true
  },
  email : {
      type : String,
      required: true,
      unique: true
  },
  password : {
      type : String,
      require: true,
      minlength: 8
  },
  pseudo : {
      type : String,
      require: true,
      unique:true
  },
  birthDate : {
      type : Date,
      require: true
  },
  profilePicture : String,
  followers : [{
      type : Schema.Types.ObjectId, ref: "User"
  }],
  following : [{
      type : Schema.Types.ObjectId, ref: "User"
  }],
  tweets : [{
    type : Schema.Types.ObjectId, ref: "Tweet"
  }],
  retweets : [{
    type : Schema.Types.ObjectId, ref: "Tweet"
  }],
  comments : [{
    type : Schema.Types.ObjectId, ref: "Comment"
  }] 
}, {
    timestamps: true
})

const User = model('User', UserSchema)

module.exports = User

