const basiqClient = require('../clients/basiqApiClient');
const repository = require("../database/repositories/mongooseRepository")

const createUser = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.createUser(req.body, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})

const getUserJobs = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.getUserJobs(req.params.id, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})

const getUserAccounts = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.getUserAccounts(req.params.id, token)
        .then((response) => {
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})

const getUserAccount = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.getUserAccount(req.body.url, token)
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
    getUserAccounts,
    getUserAccount
}