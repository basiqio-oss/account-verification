module.exports = function () {
    var cache = {};
    var nowInSeconds = Date.now() / 1000;

    return {
        getToken: (scope) => { 
            return cache[scope]; 
        },

        setToken: (scope, token) => {
            // set new token and add the calculated expiry time
            cache[scope] = {
                ...token, 
                valid_to: nowInSeconds + token.expires_in 
            }

            return cache[scope];
        }
    }
}();