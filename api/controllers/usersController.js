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
    // let response = await basiqClient.getServerToken()
    // let token = response.data.access_token
    // console.log(token)

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiJlMzM1YWU2My04NzQ4LTQ5MzEtOTI1Ni1iMmQ5ZTg4NDQwOGEiLCJhcHBsaWNhdGlvbmlkIjoiNmE5ODkxMDMtYWI5Yi00YjRmLWIwMTEtZWMwYTNkNDg2YjZjIiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50IjpmYWxzZSwiY29ubmVjdF9zdGF0ZW1lbnRzIjp0cnVlLCJlbnJpY2giOiJwYWlkIiwiZW5yaWNoX2FwaV9rZXkiOiJadG84aG1qVnh5NWpTQWRFSU9YSHoxbTlHVjRtdGw0ajI1aHdmQUQyIiwiZW5yaWNoX2VudGl0eSI6dHJ1ZSwiZW5yaWNoX2xvY2F0aW9uIjp0cnVlLCJlbnJpY2hfY2F0ZWdvcnkiOnRydWUsImFmZm9yZGFiaWxpdHkiOiJwYWlkIiwiaW5jb21lIjoicGFpZCIsImV4cGVuc2VzIjoicGFpZCIsImV4cCI6MTYyNDUyOTM4NCwiaWF0IjoxNjI0NTI1Nzg0LCJ2ZXJzaW9uIjoiMi4wIiwiZGVuaWVkX3Blcm1pc3Npb25zIjpbXX0.xbxmiOxjk5aNTLZ1DLU7DpVsxRKacQHboUu0bJH107M"

    basiqClient.getUserJobs(req.params.id, token)
        .then((response) => {
            // console.log(response)
            res.json(response.data)
        })
        .catch((error) => {
            res.send(error);
        })
})