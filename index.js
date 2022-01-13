const express = require("express")
const app = express()
const port = 5000
const mongoose = require("mongoose")

const dbName = "twittercluster"
const dbUrl = `mongodb+srv://EloiGry:aXy7Hf6aHi6Kknu@${dbName}.mnbcn.mongodb.net/test`

const usersRoutes = require("./routes/users")
const tweetsRoutes = require("./routes/tweets")
const commentsRoutes = require("./routes/comments")


mongoose.connect(dbUrl)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log(`Connection to ${dbName} established`)
})

app.use(express.json())

app.use('/users', usersRoutes)
// app.use('/tweets', tweetsRoutes)
app.use('/comments', commentsRoutes)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })