module.exports = function () {
    var cache = {};
    var nowInSeconds = Date.now() / 1000;

    return {
        getToken: (key) => { 
            return cache[key]; 
        },

        setToken: (key, val) => {
            // set new token and add the calculated expiry time
            cache[key] = {
                ...val, 
                valid_to: nowInSeconds + val.expires_in 
            }

            return cache[key];
        }
    }
}();