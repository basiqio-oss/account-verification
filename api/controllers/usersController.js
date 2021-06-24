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

exports.getUserJobs = (async (req, res) => {
    let response = await basiqClient.getServerToken()
    let token = response.data.access_token

    basiqClient.getUserJobs(req.params.id, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})

exports.getUserAccounts = (async (req, res) => {
    let response = await basiqClient.getServerToken()
    let token = response.data.access_token

    basiqClient.getUserAccounts(req.params.id, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})