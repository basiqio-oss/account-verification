const basiqClient = require('../clients/basiqApiClient');

exports.getToken = ((req, res, next) => {
    basiqClient.getToken(req.params.scope)
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.send(error)
    })
})