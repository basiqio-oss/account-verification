const basiqClient = require('../clients/basiqApiClient');

const serverScope = "SERVER_ACCESS";

const createUser = (async (req, res) => {
    let response = await basiqClient.getToken(serverScope)
    let token = response.data.access_token

    basiqClient.createUser(req.body, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})

const getUserJobs = (async (req, res) => {
    let response = await basiqClient.getToken(serverScope)
    let token = response.data.access_token

    basiqClient.getUserJobs(req.params.id, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})

const getUserAccounts = (async (req, res) => {
    let response = await basiqClient.getToken(serverScope)
    let token = response.data.access_token

    basiqClient.getUserAccounts(req.params.id, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})

module.exports = {
    createUser, 
    getUserJobs,
    getUserAccounts
}