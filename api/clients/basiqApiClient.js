const axios = require('axios');

const API_BASE_URL = 'https://au-api.basiq.io';
const BASIQ_API_VERSION = '2.1'

const getToken = async (scope) => {
    const config = {
        headers: {
            'Content-Type': `application/x-www-form-urlencoded;scope=${scope}`,
            'Authorization': `Basic ${process.env.BASIQ_API_KEY}`,
            'basiq-version': BASIQ_API_VERSION
          }
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token`, null, config);
        return response;
    } catch (error) {
        return console.log(`this is the error response ${error}`);
    }
}

const createUser = async function(user, token) {
    const standardHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'basiq-version': BASIQ_API_VERSION
            }
        }

    body = JSON.stringify({
        "email": user.email,
        "mobile": user.phone
      })

    try {
        const response = await axios.post(`${API_BASE_URL}/users`, body, standardHeaders);
        return response;
    } catch (error) {
        return console.log(error)
    }
}

const getUserJobs = async function(userId, token) {
    const standardHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'basiq-version': BASIQ_API_VERSION
            }
        }

    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/jobs`, standardHeaders);
        return response;
    } catch (error) {
        return console.log(error)
    }
}

const getUserAccounts = async function(url, token) {
    const standardHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'basiq-version': BASIQ_API_VERSION
            }
        }

    try {
        const response = await axios.get(`${API_BASE_URL}${url}`, standardHeaders);
        return response;
    } catch (error) {
        return console.log(error)
    }
}

const refreshConnection = async function(connectionUrl, token) {
    const standardHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'basiq-version': BASIQ_API_VERSION
            }
        }

    try {
        const response = await axios.post(`${connectionUrl}/refresh`, null, standardHeaders);
        return response;
    } catch (error) {
        return console.log(error)
    }
}

module.exports = {
    createUser,
    getUserJobs,
    getToken,
    getUserAccounts,
    refreshConnection
};