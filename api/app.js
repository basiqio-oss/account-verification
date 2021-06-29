const express = require("express");
const app = express();

const authenticationController = require("./controllers/authenticationController");
const usersController = require("./controllers/usersController");
const mongooseRepository = require("./database/repositories/mongooseRepository")

const url = 'mongodb://localhost/account-verification';
const port = process.env.NODE_ENV === 'test' ? 4000 : 3001;
const thirtyMinutes = 1800000;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded());

app.get('/api/ping', (req, res) => {
    res.send('pong')
  })

app.get("/api/token/:scope", authenticationController.getToken)

app.post("/api/users", usersController.createUser);

app.get("/api/users/:id/jobs", usersController.getUserJobs);
app.get("/api/users/:id/accounts", usersController.getUserAccounts);
app.post("/api/account", usersController.getUserAccount)

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