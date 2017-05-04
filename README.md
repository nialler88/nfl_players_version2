# nfl_players_version2
This is version 2 of my NFL_Players API. It is a continuation from my first assignment.

Added functionality
Connecting to mLab using Mongoose. 
Added a Schema to only take in certain entries.
Validation in the schema include the user having to insert:

an id which is the email address of the player. this field has to be entered for the api to accept insertrs.
jersey number of each player that has to take a value >=0 and <=99.
name of the player.
team that the player plays with.
position the player mainly plays in.

there is an origin field that has takes in two parameters, where the player is from and the college that the player went to before they entered the NFL.
a field that stores when the entry was created.

There is unit testing added to the API.
It test the 'get' function and the 'post' functions.

I've also deployed the API to Amazon web services.
