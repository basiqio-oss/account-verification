var express = require("express");
var app = express();
var authenticationController = require("./controllers/authenticationController");
var usersController = require("./controllers/usersController");

const Token = require('./models/token');
const url = 'mongodb://localhost/account-verification';
const port = process.env.NODE_ENV === 'test' ? 4000 : 3001;

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
 console.log(`Port running at ${port}`);
});