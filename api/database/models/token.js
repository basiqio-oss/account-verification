var mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    type: String,
    token: String
  },
  { timestamps: true }
  );

module.exports = mongoose.model('Token', tokenSchema);