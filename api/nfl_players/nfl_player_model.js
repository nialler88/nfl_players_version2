'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var nfl_playerSchema = new Schema({
                                  _id:{type:String, required: true},
                                  jerseyNo:{type:Number, min:0, max:99},
                               name: String,
                               team: String,
                               position: String,
                                  origin: {college:String, hometown:String},
                               updated: { type: Date, default: Date.now },
                                  meta:{
                                  
                                  votes:Number,
                                  favs:Number}
                               });

module.exports = mongoose.model('nflPlayer', nfl_playerSchema);
