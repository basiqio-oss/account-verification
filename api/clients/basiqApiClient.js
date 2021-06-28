const axios = require('axios');

const API_BASE_URL = 'https://au-api.basiq.io';

const getToken = async (scope) => {
    const config = {
        headers: {
            'Content-Type': `application/x-www-form-urlencoded;scope=${scope}`,
            'Authorization': `Basic ${process.env.BASIQ_API_KEY}`,
            'basiq-version': '2.0'
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
            'basiq-version': '2.0'
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
            'basiq-version': '2.0'
            }
        }

    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/jobs`, standardHeaders);
        return response;
    } catch (error) {
        return console.log(error)
    }
}

const getUserAccounts = async function(userId, token) {
    const standardHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'basiq-version': '2.0'
            }
        }

    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/accounts`, standardHeaders);
        return response;
    } catch (error) {
        return console.log(error)
    }
}

module.exports = {
    createUser,
    getUserJobs,
    getUserAccounts,
    getToken
};