const express = require("express");
const app = express();
const mongooseRepository = require("./database/repositories/mongooseRepository")
const routes = require("./common/routes")

const url = 'mongodb://localhost/account-verification';
const port = process.env.NODE_ENV === 'test' ? 4000 : 3001;
const thirtyMinutes = 1800000;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded());
app.use('/', routes)

var mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

module.exports = app.listen(port, () => {
  mongooseRepository.saveServerToken()
  setInterval(mongooseRepository.saveServerToken, thirtyMinutes)

  console.log(`Port running at ${port}`);
});