const basiqClient = require("../clients/basiqApiClient");
const token = require("../models/token");
const Token = require('../models/token');

const saveServerToken = async () => {
    let tokenResponse = await basiqClient.getToken("SERVER_ACCESS")
    let update = { token: tokenResponse.data.access_token };
    let filter = { type: "SERVER_ACCESS" };
  
    let updatedToken = await Token
        .findOneAndUpdate(
        filter, 
        update, {
            upsert: true, 
            new: true, 
            setDefaultsOnInsert: true
        })
  
    updatedToken.save();
  }

const getServerToken = async () => {
    let filter = { type: "SERVER_ACCESS" };

    return Token
        .findOne(filter)
        .then((token) => {
            return token.token;
        })
        .catch(function(err) {
            console.log(err);
        });
}

module.exports = {
    saveServerToken,
    getServerToken
}