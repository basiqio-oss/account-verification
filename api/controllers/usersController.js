const basiqClient = require('../clients/basiqApiClient');

exports.createUser = ((req, res) => {
    basiqClient.createUser(req.body, req.headers.authorization)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})