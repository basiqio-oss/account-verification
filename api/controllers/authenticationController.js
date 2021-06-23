const authenticateClient = require('../clients/authenticateClient');

exports.getTokenClient((req, res, next) => {
    authenticateClient.getClientToken()
        .then(response => {
        res.json(response.data);
        })
        .catch(error => {
        res.send(error)
        })
})
      

exports.getTokenServer((req, res, next) => {
    authenticateClient.getServerToken()
        .then(response => {
        res.json(response.data);
        })
        .catch(error => {
        res.send(error)
        })
})