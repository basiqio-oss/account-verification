const axios = require('axios');
const qs = require('qs');

/**
 * The Basiq API authentication process is fairly straight forward, we simply exchange our API key for a token which has an expiry of 60 minutes
 * Our token will be passed as the authorization header to requests made to the Basiq API, which you can find in `pages/api`
 *
 * We don't want to request a new token on every request, so in this file we create a simple token cache
 * We have a simple interval to get a new token every 30 minutes
 *
 * https://api.basiq.io/reference/authentication
 * */

const SERVER_TOKEN_REQ_KEY = 'BASIQ_ACCESS_TOKEN';
const REFRESH_INTERVAL = 1000 * 60 * 30; // 30 minutes

let serverToken = undefined;

async function setupTokenCache() {
  serverToken = await getNewServerToken();

  setInterval(async () => {
    serverToken = await getNewServerToken();
  }, REFRESH_INTERVAL);
}

async function attatchServerTokenToReq(req) {
  req[SERVER_TOKEN_REQ_KEY] = serverToken;
}

async function getBasiqAuthorizationHeader(req) {
  return `Bearer ${req[SERVER_TOKEN_REQ_KEY]}`;
}

async function getNewServerToken() {
  const { data } = await axios({
    method: 'post',
    url: 'https://au-api.basiq.io/token',
    headers: {
      Authorization: `Basic ${process.env.BASIQ_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'basiq-version': '2.0',
    },
    data: qs.stringify({ scope: 'SERVER_ACCESS' }),
  });
  return data.access_token;
}

async function getClientToken() {
  const { data } = await axios({
    method: 'post',
    url: 'https://au-api.basiq.io/token',
    headers: {
      Authorization: `Basic ${process.env.BASIQ_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'basiq-version': '2.0',
    },
    data: qs.stringify({ scope: 'CLIENT_ACCESS' }),
  });
  return data.access_token;
}

module.exports = {
  setupTokenCache,
  attatchServerTokenToReq,
  getBasiqAuthorizationHeader,
  getClientToken,
};
