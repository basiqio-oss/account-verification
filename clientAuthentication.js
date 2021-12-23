import { axios } from './utils/axios';

const REFRESH_INTERVAL = 1000 * 60 * 30; // 30 minutes
const TOKEN_KEY = 'basiqApiClientAccessToken';
const REFRESH_DATE_KEY = 'basiqApiClientAccessTokenRefreshDate';

export async function getBasiqAuthorizationHeader() {
  const token = await getClientToken();
  return `Bearer ${token}`;
}

async function getClientToken() {
  let token = getClientTokenFromLocalStorage();
  const refreshDate = getClientTokenRefreshDateFromLocalStorage() || 0;

  if (!token || Date.now() - refreshDate > REFRESH_INTERVAL) {
    // If we don't have a client token in memory or the token has expired, fetch a new one
    token = await updateClientToken();
  }

  return token;
}

async function updateClientToken() {
  const token = await getNewClientToken();
  setClientTokenInLocalStorage(token);

  const refreshDate = Date.now();
  setClientTokenRefreshDateInLocalStorage(refreshDate);

  return token;
}

async function getNewClientToken() {
  const { data } = await axios.get('/api/client-token');
  return data;
}

export function getClientTokenFromLocalStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setClientTokenInLocalStorage(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getClientTokenRefreshDateFromLocalStorage() {
  return localStorage.getItem(REFRESH_DATE_KEY);
}

export function setClientTokenRefreshDateInLocalStorage(token) {
  localStorage.setItem(REFRESH_DATE_KEY, token);
}
