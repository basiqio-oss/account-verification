const authenticationController = require("../controllers/authenticationController");
const usersController = require("../controllers/usersController");

var express = require('express')
var router = express.Router()

router.get('/api/ping', (req, res) => {
    res.send('pong')
  })

router.get("/api/token/:scope", authenticationController.getToken)
router.get("/api/users/:id/jobs", usersController.getUserJobs);

router.post("/api/users", usersController.createUser);
router.post("/api/accounts", usersController.getUserAccounts)
router.post("/api/refresh-connection", usersController.refreshConnection)

module.exports = router;