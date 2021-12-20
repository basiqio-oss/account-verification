const express = require('express');
const next = require('next');
const { setupTokenCache, attatchServerTokenToReq } = require('./utils/basiqTokens');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  setupTokenCache().then(() => {
    const server = express();

    server.all('*', (req, res) => {
      attatchServerTokenToReq(req);
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
});
