'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var User = new Schema({
    username:{type:String, required: true, unique: true}
});

var userSchema  = mongoose.model('User', User);
// userSchema.plugin(uniqueValidator);
module.exports = userSchema;