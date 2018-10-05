require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

//argument to store elements
var searchTerm = process.argv.slice(3).join(" "); // search on API database
var liriCommand = process.argv[2]; //search term

//commands for liri

//Functions
//var commands = {

var song = function (song) {
    spotify.search({
        type: 'track',
        query: song
    }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song: " + songData.name);
                //spotify preview link
                console.log("Preview URL: " + songData.preview_url);
                //album name
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");

                //adds text to log.txt
                fs.appendFile('log.txt', songData.artists[0].name);
                fs.appendFile('log.txt', songData.name);
                fs.appendFile('log.txt', songData.preview_url);
                fs.appendFile('log.txt', songData.album.name);
                fs.appendFile('log.txt', "-----------------------");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}
var movie = function (movie) {
    var omdbURL = 'http://www.omdbapi.com/?i=tt3896198&t=' + movie +'&apikey=c3af164f';

    request(omdbURL, function (err, response, body) {
        if (err) {
            return console.error('Error occurred.');
        } else {
            var data = JSON.parse(body);
        
            console.log("Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMdB Rating: " + data.imdbRating);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            

            //adds text to log.txt
            //fs.appendFile('log.txt', "Title: " + data.Title);
            //fs.appendFile('log.txt', "Release Year: " +  data.Year);
            //fs.appendFile('log.txt', "IMdB Rating: " +  data.imdbRating);
            //fs.appendFile('log.txt', "Country: " +  data.Country);
            //fs.appendFile('log.txt', "Language: " +  data.Language);
            //fs.appendFile('log.txt', "Plot: " +  data.Plot);
            //fs.appendFile('log.txt', "Actors: " +  data.Actors);
            //fs.appendFile('log.txt', "Rotten Tomatoes Rating: " +  data.Ratings[1].Value);
        


        }
    });
}
var concert = function (artist) {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("\nBand search: " + artist);
            var body = JSON.parse(body);

            for (var i = 0; i < body.length; i++) {

                var find = body[i].venue;
                var datetime = body[i].datetime;


                var bands = [
                    "Venue: " + find.name,
                    "Location: " + find.city + ", " + find.region,
                    "Date: " + datetime,
                    // "Time: " + time,
                ].join("\n");
                console.log("\nEvent " + (i + 1) + ": " + "\nVenue: " + bands);

                //fs.appendFile("log.txt", "\nConcert search...\nBand: " + artist + "\nEvent " + (i + 1) + ": " + "\nVenue: " + bands + divider, function (err) {
                   // if (err) throw err;
                //});

            }

            // Write the object to the command line
        } else {
            console.log("Something went wrong.");
        }
    });
}
// liri commands
if (liriCommand === "spotify-this-song") {
    song(searchTerm);
} else if (liriCommand === "concert-this"){
    concert(searchTerm);
} else if (liriCommand === "movie-this") {
    movie(searchTerm);

} else {
    console.log("error")

}