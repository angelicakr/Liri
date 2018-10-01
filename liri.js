require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
var bandsintown = require('bandsintown')
var spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = require('omdb');
var fs = require('fs');

//argument to store elements
var database = process.argv[2]; // search on API database
var liriCommand = process.argv[3]; //search term

//commands for liri
if (liriCommand === "spotify-this-song" || liriCommand === "concert-this") {
    spotify();
    concert();

} if (liriCommand === "movie-this"){
    movie();

} else {
    console.log("error")
}
//Functions
var commands = {

    spotify: function (song) {
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
    },
    movie: function (movie) {
        var omdbURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c3af164f';

        omdb.search(omdbURL, function (err, movies) {
            if (err) {
                return console.error('Error occurred.');
            } else {
                console.log("Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMdB Rating: " + body.imdbRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
                console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
                console.log("Rotten Tomatoes URL: " + body.tomatoURL);

                //adds text to log.txt
                fs.appendFile('log.txt', "Title: " + body.Title);
                fs.appendFile('log.txt', "Release Year: " + body.Year);
                fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
                fs.appendFile('log.txt', "Country: " + body.Country);
                fs.appendFile('log.txt', "Language: " + body.Language);
                fs.appendFile('log.txt', "Plot: " + body.Plot);
                fs.appendFile('log.txt', "Actors: " + body.Actors);
                fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
                fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);


            }
        });
    },
    concert: function () {


        request(queryURL, function (error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {
                console.log("\nBand search: " + band);
                var body = JSON.parse(body);

                for (var i = 0; i < body.length; i++) {

                    var find = body[i].venue;
                    var datetime = body[i].datetime;


                    var bands = [
                        "Venue: " + find.name,
                        "Location: " + find.city + ", " + find.region,
                        "Date: " + date,
                        // "Time: " + time,
                    ].join("\n");
                    console.log("\nEvent " + (i + 1) + ": " + "\nVenue: " + bands);

                    fs.appendFile("log.txt", "\nConcert search...\nBand: " + band + "\nEvent " + (i + 1) + ": " + "\nVenue: " + bands + divider, function (err) {
                        if (err) throw err;
                    });

                }

                // Write the object to the command line
            } else {
                console.log("Something went wrong.");
            }
        });
    }


}