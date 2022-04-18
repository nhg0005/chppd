// URL Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  actual_url: { type: String },
  shortened_url: { type: String },
});

module.exports = mongoose.model("Url", UrlSchema);
