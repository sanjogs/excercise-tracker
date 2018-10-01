'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Excercise = new Schema({
    userId:{type:Schema.Types.ObjectId, required:true},
    description:{type:String, required:true},
    duration:{type:Number, required:true}, 
    date:Date
});

module.exports = mongoose.model('Excercise', Excercise);