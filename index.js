const express = require("express")
const app = express()
const port = 5000
const cors = require('cors')
const session = require("express-session")
const passport = require("./config/passport")
const mongoose = require("mongoose")
// les routes importer
const usersRoutes = require("./routes/users")
const tweetsRoutes = require("./routes/tweets")
const commentsRoutes = require("./routes/comments")
const authRoutes = require("./routes/authentification")

const dbName = "twittercluster"
const dbUrl = `mongodb+srv://EloiGry:aXy7Hf6aHi6Kknu@${dbName}.mnbcn.mongodb.net/test`


mongoose.connect(dbUrl)
const db = mongoose.connection

db.on('error', (err) => {
  console.log("mon erreur serveur de connection",err)
})

db.once('open', () => {
  console.log(`Connection to ${dbName} established`)
})

require('./models/Tweet')
require('./models/User')
require('./models/Comment')

app.use(express.json())
// permet de rendre mon dossier public accessible a tout le monde 
// grace a express.static
// app.use(express.static('public'))
//methode qui nous vient de express-session pour initialiser la session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))
// permet au front de récup le backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
// permet s'utiliser passport et de lier passport a express
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', usersRoutes)
app.use('/tweets', tweetsRoutes)
app.use('/comments', commentsRoutes)
app.use('/auth', authRoutes)


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})