const axios = require('axios');

const API_URL = 'https://au-api.basiq.io/token';

const getClientToken =  async function() {

    const API_KEY = process.env.API_KEY;

    const data = "";
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;scope=CLIENT_ACCESS',
            'Authorization': `Basic ${API_KEY}`,
            'basiq-version': '2.0'
          }
    }

    try {
        const response = await axios.post(API_URL, data, config);
        console.log(response);
        return response;
    } catch (error) {
       return console.log(`this is the error response ${error}`);
    }
}

const getServerToken =  async function() {
    
    const API_KEY = process.env.API_KEY;

    const data = null;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;scope=SERVER_ACCESS',
            'Authorization': `Basic ${API_KEY}`,
            'basiq-version': '2.0'
          }
    }

    try {
        const response = await axios.post(API_URL, data, config);
        console.log(response);
        return response;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getClientToken,
    getServerToken
};