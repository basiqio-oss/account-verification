const basiqClient = require('../clients/basiqApiClient');

exports.createUser = (async (req, res) => {
    let response = await basiqClient.getServerToken()
    let token = response.data.access_token

    basiqClient.createUser(req.body, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})