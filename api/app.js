var express = require("express");
var app = express();
var authenticationController = require("./controllers/authenticationController")

require('dotenv').config();

app.get("/api/client-token", authenticationController.getClientToken);
app.get("/api/server-token", authenticationController.getServerToken);

app.listen(3001, () => {
 console.log("Server running on port 3001");
});