const basiqApiClient = require("../clients/basiqApiClient");
var cache = require('../common/cache');

const isTokenExpiring = (expiryDate) => {
    var now = Date.now() / 1000
    if ((expiryDate - now) < 600) {
        return true
    }
}

const getValidToken = async (scope) => {
    let token = cache.getToken(scope);

    if (!token || isTokenExpiring(token.valid_to)) {
        let tokenResponse = await basiqApiClient.getToken(scope)
        cache.setToken(scope, tokenResponse.data) 

        return tokenResponse.data;
    }
       
    return token;

}

module.exports = {
   getValidToken
}