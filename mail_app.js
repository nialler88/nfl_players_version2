var api_key = 'key-69fbb41b9885295d71e0570438df55ce';
var domain = 'mg.nialler.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var nflPlayerEvent = require('./events');

var  messageHandler = function(m) {
    // The Payload
    var data = {
    from: 'NFL America <nfl@america.ie>',
    to: JSON.parse(m)._id,
    subject: 'Welcome',
    text: 'You are now a registered NFL player!!! Can you live up to the hype?'
    };
    
    mailgun.messages().send(data, function (error, body) {
                            console.log(body);
                            });
}

nflPlayerEvent.subscribe('create_nfl_player_event', messageHandler)
console.log('server running')
