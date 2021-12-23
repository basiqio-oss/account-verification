import Axios from 'axios';

export const axios = Axios.create();

// Inset the "Authorization" header when making requests to the Basiq API directly
axios.interceptors.request.use(function (request) {
  const { url, headers } = request;
  const token = 'XX';
  if (url?.startsWith('')) {
    headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axios.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  function (response) {
    return response;
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  function (error) {
    // Provide a more useful error message to the user when calling the Basiq API
    if (error.response.config.url.startsWith('https://au-api.basiq.io/') && error.response.status === 403) {
      const details = error.response.data.data?.[0];
      return Promise.reject(details ? Error(details.title + ': ' + details.detail) : error);
    }
    return Promise.reject(error);
  }
);
