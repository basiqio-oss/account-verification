var mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    type: String,
    updated: { type: Date, default: Date.now() },
    token: String
  });

module.exports = mongoose.model('Token', tokenSchema);