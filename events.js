'use strict';
// Pubnub service configuration
// ===========================

var PubNub = require('pubnub');

var pubnub = new PubNub({
                        publishKey: "pub-c-32a278cf-b8d8-42d3-994a-58bb9208b29c",
                        
                        subscribeKey: "sub-c-c71589ba-0285-11e7-9072-02ee2ddab7fe",
                        secretKey: "sec-c-ZDc5MWQxYWMtMzIzNC00YjY5LTg1ZTYtMGM4Njk5Njg1MmRh",
                        ssl: true
                        });



module.exports = {
publish: function(channel, message){
    pubnub.publish({
                   channel: channel,
                   message: JSON.stringify(message)},
                   function(status, response) {
                   if (status.error) {
                   console.log(status)
                   } else {
                   console.log("message Published w/ timetoken", response.timetoken)
                   }
                   });
},
subscribe: function(channel, callback){
    
    pubnub.addListener({
                       
                       message: function(m) {
                       // handle message
                       
                       var msg = m.message; // The Payload
                       
                       callback(msg);
                       }
                       });
    // Subscribe to the demo_tutorial channel
    pubnub.subscribe({
                     channels: [channel]
                     });
}
}
