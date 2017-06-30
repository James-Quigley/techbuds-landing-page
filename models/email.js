var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Email = new Schema({
    email: String
});


module.exports = mongoose.model('Email', Email);