const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
});

const AuthorModel = mongoose.model('author', authorSchema);
module.exports = AuthorModel;