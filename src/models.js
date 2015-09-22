var Mongoose = require('mongoose');

var Formula = Mongoose.model('formula', new Mongoose.Schema({
  name          : { type: String, required: true, trim: true },
  full_name     : { type: String, required: false, trim: true },
  description   : { type: String, required: false, trim: true },
  url           : { type: String, required: false, trim: true },
  added         : { type: Number, required: true, default: 0 },
  count         : { type: Number, required: true, default: 0 },
  score         : { type: Number, required: true, default: 0 }
}, {
  collection    : 'formulae'
}));

module.exports = {
  Formula: Formula
};
