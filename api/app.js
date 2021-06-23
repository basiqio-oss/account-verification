var express = require("express");
var app = express();
var authenticationController = require("./controllers/authenticationController")

app.get("/api/client-token", authenticationController.getTokenClient);
app.get("/api/server-token", authenticationController.getTokenServer);

app.listen(3001, () => {
 console.log("Server running on port 3001");
});