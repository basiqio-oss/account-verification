const basiqClient = require('../clients/basiqApiClient');
const repository = require("../database/repositories/mongooseRepository");
const { successResponse, errorResponse } = require('../common/response')

const createUser = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.createUser(req.body, token)
        .then((response) => {
            successResponse(res, response.data)
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

const getUserJobs = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.getUserJobs(req.params.id, token)
        .then((response) => {
            successResponse(res, response.data)
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

const getUserAccounts = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.getUserAccounts(req.params.id, token)
        .then((response) => {
            successResponse(res, response.data)
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

const getUserAccount = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.getUserAccount(req.body.url, token)
        .then((response) => {
            successResponse(res, response.data)
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

const refreshConnection = (async (req, res) => {
    let token = await repository.getServerToken();
    basiqClient.refreshConnection(req.body.connectionUrl, token)
        .then((response) => {
            successResponse(res, response.data)
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

module.exports = {
    createUser, 
    getUserJobs,
    getUserAccounts,
    getUserAccount,
    refreshConnection
}