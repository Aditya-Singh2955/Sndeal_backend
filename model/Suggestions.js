const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
