const basiqClient = require('../clients/basiqApiClient');

exports.getClientToken = ((req, res, next) => {
    const data = null;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;',
            'Authorization': `Basic ${process.env.BASIQ_API_KEY}`,
            'basiq-version': '2.0',
            'scope': 'CLIENT_ACCESS'
          },
    }

    basiqClient.getClientToken(data, config)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.send(error)
        })
})
      

exports.getServerToken = ((req, res, next) => {
    const data = null;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;scope=SERVER_ACCESS',
            'Authorization': `Basic ${process.env.BASIQ_API_KEY}`,
            'basiq-version': '2.0'
          }
    }

    basiqClient.getServerToken(data, config)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.send(error)
        })
})