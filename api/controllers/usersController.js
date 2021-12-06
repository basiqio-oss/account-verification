const basiqClient = require('../clients/basiqApiClient');
const { successResponse, errorResponse } = require('../common/response')
const { accountDTO } = require('../DTOs/accountDto'); 
const { SERVER_ACCESS } = require("../common/constants");
const { getValidToken } = require('../common/helpers');

const createUser = (async (req, res) => {
    let token = await getValidToken(SERVER_ACCESS)
    basiqClient.createUser(req.body, token.access_token)
        .then((response) => {
            successResponse(res, response.data)
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

const getUserJobs = (async (req, res) => {
    let token = await getValidToken(SERVER_ACCESS)
    basiqClient.getUserJobs(req.params.id, token.access_token)
        .then((response) => {
            successResponse(res, response.data)
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

const getUserAccounts = (async (req, res) => {
    let token = await getValidToken(SERVER_ACCESS)
    basiqClient.getUserAccounts(req.body.url, token.access_token)
        .then((response) => {
            let accounts = [];
            response.data.data.forEach(account => accounts.push(accountDTO(account)))
        
            successResponse(res, accounts);
        })
        .catch((error) => {
            errorResponse(res, error)
        })
})

const refreshConnection = (async (req, res) => {
    let token = await getValidToken(SERVER_ACCESS)
    basiqClient.refreshConnection(req.body.connectionUrl, token.access_token)
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
    refreshConnection
}