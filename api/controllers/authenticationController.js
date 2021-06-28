const basiqClient = require('../clients/basiqApiClient');

const getToken = ((req, res, next) => {
    basiqClient.getToken(req.params.scope)
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.send(error)
    })
})

module.exports = {
    getToken
}