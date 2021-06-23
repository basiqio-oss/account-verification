var express = require("express");
var app = express();

const authenticateClient = require('./clients/authenticateClient');

app.get("/api/client-token", (req, res, next) => {
  authenticateClient.getClientToken()
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.send(error)
    })
})

app.get("/api/server-token", (req, res, next) => {
  console.log('getting server token')
  authenticateClient.getServerToken()
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.send(error)
    })
})

app.listen(3001, () => {
 console.log("Server running on port 3001");
});