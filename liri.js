// set what are known as environment variables to the global process.env object in node
require("dotenv").config();

//make https calls module
var request = require("request");

// file system module
var fs = require("fs");

//axios module
var axios = require("axios");

// import the keys.js file and store it in a variable
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// user inputs
var choice = process.argv[2]; 
var userInput = process.argv[3];

function findConcert(userInput){
    var queryUrl = ("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp");
    axios
      .get(queryUrl)
      .then(function (response) { 
        for(var i=0; i<response.data.length; i++){
            console.log("\nName of the venue: " + response.data[i].venue.name);
            console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);            
            console.log("Date of the event: " + response.data[i].datetime);
            console.log("************************");
        }      
    }).catch(function (error) {
        console.log(error);
    });
}   
    
function spotifySong (userInput){
    spotify.search({ type: "track", query: userInput }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }          
        for(var i=0; i<data.tracks.items.length; i++){ 
            console.log("\nArtist's name: " + data.tracks.items[i].artists[0].name);
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Preview URL : " + data.tracks.items[i].preview_url); 
            console.log("Album Name : " + data.tracks.items[i].album.name);
            console.log("*************************");           
        }        
    });
}

function findMovie(userInput){
    var queryUrl = ("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy");
    axios
      .get(queryUrl)
      .then(function (response) { 
         
        console.log("\nTitle of the movie: " + response.data.Title);
        console.log("Date the movie came out: " + response.data.Released);
        console.log("IMDB of the movie: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
        console.log("Country where the movie was produced: " + response.data.Country);
        console.log("Languages: " + response.data.Language);
        console.log("Plot of the movie: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("*********************************"); 

    }).catch(function (error) {
        console.log(error);
    });
}

function doWhatItSays(){    
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }    
        var dataArr = data.split(",");  
        console.log(dataArr);
        chooseLIRI(dataArr[0], dataArr[1]);
});
}

function chooseLIRI(choice, userInput){
    switch (choice) {
        case 'concert-this':
            findConcert(userInput);
            break;
        case 'spotify-this-song':
            spotifySong(userInput);
            break;
        case 'movie-this':
            findMovie(userInput);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default: 
            console.log("Error - try again.");
    };
}

chooseLIRI(choice, userInput);
