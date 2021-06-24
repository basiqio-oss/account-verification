var express = require("express");
var app = express();
var authenticationController = require("./controllers/authenticationController")
var usersController = require("./controllers/usersController")

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded());

app.get('/api/ping', (req, res) => {
    res.send('pong')
  })

app.get("/api/client-token", authenticationController.getClientToken);
app.get("/api/server-token", authenticationController.getServerToken);

app.post("/api/users", usersController.createUser);

app.listen(3001, () => {
 console.log("Server running on port 3001");
});