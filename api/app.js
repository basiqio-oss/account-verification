const express = require("express");
const app = express();
const routes = require("./common/routes");

const port = process.env.NODE_ENV === 'test' ? 4000 : 3001;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded());
app.use('/', routes)

module.exports = app.listen(port, () => {
  console.log(`Port running at ${port}`);
});