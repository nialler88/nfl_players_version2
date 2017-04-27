'use strict';

var _ = require('lodash');
var nflPlayer = require('./nfl_player_model');
var nflPlayerEvent = require('../../events');

// Get list of contacts
exports.index = function(req, res) {
    // Connect to the db
    nflPlayer.find(function (err, NFL) {
                 if(err) { return handleError(res, err); }
                 return res.json(200, NFL);
                 });
    
} ;

// Creates a new contact in datastore.
exports.create = function(req, res) {
    nflPlayer.create(req.body, function(err, nfl_player) {
                   if(err) { return handleError(res, err); }
                   return res.json(201, nfl_player);
                     
                     console.log('A new player has been added');
                     nflPlayerEvent.publish('create_nfl_player_event', contact);
                   });
};

// Updates an existing contact in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    nflPlayer.findById(req.params.id, function (err, nfl_player) {
                     if (err) { return handleError(res, err); }
                     if(!nfl_player) { return res.send(404); }
                     var updated = _.merge(nfl_player, req.body);
                     updated.save(function (err) {
                                  if (err) { return handleError(res, err); }
                                  return res.json(200, nfl_player);
                                  });
                     });
};

// delete an existing contact in datastore.
exports.delete = function(req, res) {
    nflPlayer.findById(req.params.id, function (err, nfl_player) {
                     if(err) { return handleError(res, err); }
                     if(!nfl_player) { return res.send(404); }
                     nfl_player.remove(function(err) {
                                    if(err) { return handleError(res, err); }
                                    return res.send(204);
                                    });
                     });
};

function handleError(res, err) {
    return res.send(500, err);
};
