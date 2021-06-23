const axios = require('axios');

const API_BASE_URL = 'https://au-api.basiq.io';
const API_KEY = process.env.API_KEY;


const getClientToken =  async function() {
    const data = null;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;scope=CLIENT_ACCESS',
            'Authorization': `Basic ${API_KEY}`,
            'basiq-version': '2.0'
          }
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token`, data, config);
        return response;
    } catch (error) {
       return console.log(`this is the error response ${error}`);
    }
}

const getServerToken =  async function() {
    const data = null;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;scope=SERVER_ACCESS',
            'Authorization': `Basic ${API_KEY}`,
            'basiq-version': '2.0'
          }
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token`, data, config);
        return response;
    } catch (error) {
        throw new Error(error)
    }
}

const createUser = async function(userData, auth) {
    const config = {
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': auth,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiJlMzM1YWU2My04NzQ4LTQ5MzEtOTI1Ni1iMmQ5ZTg4NDQwOGEiLCJhcHBsaWNhdGlvbmlkIjoiNzEwNzY1NjQtMDM3MC00ZWU0LThkNTUtMDk0ODU5YjFlYjEyIiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50IjpmYWxzZSwiY29ubmVjdF9zdGF0ZW1lbnRzIjp0cnVlLCJlbnJpY2giOiJwYWlkIiwiZW5yaWNoX2FwaV9rZXkiOiJadG84aG1qVnh5NWpTQWRFSU9YSHoxbTlHVjRtdGw0ajI1aHdmQUQyIiwiZW5yaWNoX2VudGl0eSI6dHJ1ZSwiZW5yaWNoX2xvY2F0aW9uIjp0cnVlLCJlbnJpY2hfY2F0ZWdvcnkiOnRydWUsImFmZm9yZGFiaWxpdHkiOiJwYWlkIiwiaW5jb21lIjoicGFpZCIsImV4cGVuc2VzIjoicGFpZCIsImV4cCI6MTYyNDQyNjM5OSwiaWF0IjoxNjI0NDIyNzk5LCJ2ZXJzaW9uIjoiMi4xIiwiZGVuaWVkX3Blcm1pc3Npb25zIjpbXX0.3JOm63_hpZ6yxievOpgSRedTg9Qd4Ieq1RAmGfNtBeg',
        'basiq-version': '2.0'
        }
    }

      try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData, config);
        return response;
    } catch (error) {
        return console.log(error)
    }
}

module.exports = {
    getClientToken,
    getServerToken,
    createUser
};