'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('./config/');
var express = require('express');
var bodyParser = require('body-parser');
//create routing object
var nfl_player = require('./api/nfl_players/index');





var csp = require('helmet-csp');
var helmet = require('helmet'); //ref:https://www.npmjs.com/package/helmet
var cookie_session = require('cookie-session')
var express_session = require('express-session')

//create an express app
var app = express();

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

//configure the express app to parse JSON-formatted body


//add static path.
app.use(express.static(config.root));
console.log(config.root);

app.use(bodyParser.json());
app.use(helmet());

//stops attackes detecting app is using express
app.disable('x-powered-by');


app.use(csp({
            directives: {
            defaultSrc: ["'self'", 'default.com'],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ['style.com'],
            fontSrc: ["'self'", 'fonts.com'],
            imgSrc: ['img.com', 'data:'],
            sandbox: ['allow-forms', 'allow-scripts'],
            reportUri: '/report-violation',
            objectSrc: ["'none'"],
            upgradeInsecureRequests: true
            },
            
            // detects mistakes in directives and throws error
            loose: false,
            
            //true if you only want browsers to report errors, not block them.
            reportOnly: false,
            
          
            setAllHeaders: false,
            
            // true to disable CSP on Android where it can be buggy.
            disableAndroid: false,
            
            // Set to false if you want to completely disable any user-agent sniffing.
            browserSniff: false
            }))

//ref: https://www.npmjs.com/package/helmet-csp
/*
app.get('/', function (req, res, next) {
        // Update views
        req.session.views = (req.cookie_session.views || 0) + 1
        
        // Write response
        res.end(req.cookie_session.views + ' views')
        })

//*/
var sess = {
secret: 'key1',
cookie: {
    
},
saveUninitialized:true,
resave:true
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(express_session(sess))


//app.use(yo());


app.get('/api/nfl_players',nfl_player.index);
app.post('/api/nfl_players',nfl_player.create);
app.put('/api/nfl_players/:id',nfl_player.update);
app.delete('/api/nfl_players/:id',nfl_player.delete);


// App listens on port 8000
app.listen(8000)
// PMessage sent to terminal
console.log("Server running for NFL Players on port 8000");
