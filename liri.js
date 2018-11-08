require("dotenv").config();

// Requirements for request, FS, keys, moment, and Spotify
var request = require("request")
var fs = require("fs")
var keys = require("./keys.js");
var moment = require("moment")
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);

// Node arguments
var command = process.argv[2];
var name = process.argv[3];
if (process.argv.length>4){
    for (i=4; i<process.argv.length; i++){
        name += " " + process.argv[i]
    };
};
if (command == "concert-this"){
    concertThis(name);
}
else if (command == "spotify-this-song") {
    spotifyThisSong(name);
} 
else if (command == "movie-this") {
    movieThis(name);
} 
else if (command == "do-what-it-says") {
    doWhatItSays();
} 
else {
    console.log("Please type a valid command: concert-this, spotify-this-song, movie-this, or do-what-it-says")
};

// concert-this
function concertThis(enter){
    if (enter == null) {
        return console.log("Please enter an artist or band name")
    }
    enter = "https://rest.bandsintown.com/artists/" + enter + "/events?app_id=26f7dcaf995dda228b0ecf7ac1a07315"
    request(enter, function(error, response, body){
        if (!JSON.parse(body)[0]){
            return console.log("no results found");
        }
        for (i = 0; i<JSON.parse(body).length && i < 5; i++){
            console.log("\nVenue: " + JSON.parse(body)[i].venue.name)
            console.log("Venue Location: " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.country)
            console.log("Event Date: " + moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY"))
        }
    })
};

// spotify-this-song
function spotifyThisSong(enter){
    if (enter == null){
        enter = "The Sign Ace of Base"
    }
    spotify.search({type: 'track', query: enter}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("\nArtist(s): " + data.tracks.items[0].artists[0].name)
        console.log("Song: " + data.tracks.items[0].name)
        console.log("URL: " + data.tracks.items[0].external_urls.spotify)
        console.log("Album: " + data.tracks.items[0].album.name)
    })
};

// movie-this
function movieThis(enter){
    if (enter == null){
        enter = "Mr.Nobody"
    }
    request("http://www.omdbapi.com/?t=" + enter + "&y=&plot=short&apikey=ddd1b5c6", function(error, response, body) {        
        if (!error && response.statusCode === 200) {
            console.log("\nMovie: " + JSON.parse(body).Title);
            console.log("Release Year:" + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomato Score: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production Countries: " + JSON.parse(body).Country);
            console.log("Languages: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

// do-what-it-says
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }      
        var output = data.split(";");
        var random = output[Math.floor(Math.random()*output.length)]
        random = random.split(",")
        console.log(random)
        if (random[0] == "concert-this"){
            concertThis(random[1]);
        } else if (random[0] == "spotify-this-song") {
            spotifyThisSong(random[1]);
        } else if (random[0] == "movie-this") {
            movieThis(random[1]);
        }
      });
};