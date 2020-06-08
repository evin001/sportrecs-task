const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const url = `mongodb+srv://${process.env.DB_USER}:${encodeURI(process.env.DB_PASS)}@cluster0-tv1dl.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose
  .connection
  .once('open', () => console.log(`Connected to mongo at ${url}`))
