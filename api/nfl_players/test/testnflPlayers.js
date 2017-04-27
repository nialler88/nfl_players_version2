var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("NFL Players API unit tests",function(){
         // #1 should return contacts representation in json
         it("Testing that the API should return collection of JSON documents",function(done){
            
            // calling home page api
            server
            .get("/api/nfl_players/")
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                 // HTTP status should be 200
                 res.status.should.equal(200);
                 done();
                 });
            });
         
         
         // #2 add a player
         it("Testing that the API should add a new NFL player",function(done){
            
            // post to /api/contacts
            server.post('/api/nfl_players/')
            .send({_id:"Test NFL Player",position:"Test Position"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                 res.status.should.equal(201);
                 done();
                 });
            });
        
         /*
         //deleting a player
         it("Testing that the API should delete a new NFL player",function(done){
            
            // post to /api/contacts
            server.delete('/api/nfl_players/:_id')
           // .send({_id:"Test NFL Player"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                 res.status.should.equal(201);
                 done();
                 });
            });
*/
         
         });
