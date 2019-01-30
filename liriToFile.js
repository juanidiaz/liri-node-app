////// INCLUDING PACKAGES //////

// Includes the FS package for reading and writing packages
const fs = require("fs");

// Include this npm package to manage the API calls
const axios = require("axios");

// Include this npm package to manage the API calls to Spotify
const Spotify = require('node-spotify-api');

// Include this npm npm package to load environment variables from an .env file
require("dotenv").config();

// Include this npm package to format date strings
var dateFormat = require('dateformat');

////// VARIABLES //////

//      STRINGS/CHAR
var action = process.argv[2]; // Action requested by used
var argument = process.argv[3]; // Argument provided to process the user request
var outputFile = 'log.txt' // File to save information.

// This function will console log and append the 'stuff' simultaneously
function consoleAndSave(stuff) {

    console.log(stuff);

    fs.appendFile(outputFile, (stuff + '\n'), function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            // console.log(stuff);
        }
    });

}

// Get concert infomration on an artist/band
function getConcertInfo() {

    if (!argument) { // If no band/artist provided default into 'The Who'
        argument = 'The Who';
    };

    // Set the argment to 'band'
    var band = argument;

    // Replace spaces for ASCI equivalent '%20'
    band = band.replace(' ', '%20').toLowerCase();

    //consoleAndSave(band);

    // Build the query URL based on the title provided
    var queryUrl = 'https://rest.bandsintown.com/artists/' + band + '/events?app_id=codingbootcamp';

    // Run a request with axios to the OMDB API
    axios.get(queryUrl).then(
        function (response) {

            //Print the info requested
            consoleAndSave('\n----------------------------------------');
            consoleAndSave('-             CONCERT INFO             -');
            consoleAndSave('----------------------------------------');
            consoleAndSave('Artist: ' + argument);
            consoleAndSave('----------------------------------------\n');
            for (const key in response.data) {
                consoleAndSave(' (' + (parseInt(key) + 1) + ')');
                consoleAndSave(response.data[key].venue.name);
                consoleAndSave(response.data[key].venue.city + ', ' + response.data[0].venue.region + ' (' + response.data[0].venue.country + ')');
                consoleAndSave(dateFormat(response.data[key].datetime, "mm/dd/yyyy"));
                consoleAndSave('----------------------------------------');
            }
        }
    );
};

// Get the info of a song
function getSongInfo() {

    // Request access to this file 
    var keys = require("./keys.js");

    // Set the argment to 'song'
    var song = argument;

    // Create a new variable using the keys
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    //Query for the song provided
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //Print the info requested
        consoleAndSave('\n----------------------------------------');
        consoleAndSave('-               SONG INFO              -');
        consoleAndSave('----------------------------------------\n');
        consoleAndSave('  Artist:     ' + data.tracks.items[0].artists[0].name);
        consoleAndSave('  Song name:  ' + data.tracks.items[0].name);
        consoleAndSave('  Prieview:   ' + data.tracks.items[0].preview_url);
        consoleAndSave('  Album name: ' + data.tracks.items[0].album.name);

    });
};

// Get the info of a movie
function getMovieInfo() {

    if (!argument) { // If there is no movie provided default into 'Mr. Nobody'
        argument = 'Mr Nobody';
    };

    // Replace spaces for ASCI equivalent '%20'
    argument = argument.replace(' ', '%20').toLowerCase();

    //consoleAndSave(argument);

    // Build the query URL based on the title provided
    var queryUrl = 'http://www.omdbapi.com/?t=' + argument + '&y=&plot=short&apikey=trilogy';

    // Run a request with axios to the OMDB API
    axios.get(queryUrl).then(
        function (response) {
            // Clear the console
            // consoleAndSave('\033[2J');

            //consoleAndSave(queryUrl);

            //Print the info requested
            consoleAndSave('\n----------------------------------------');
            consoleAndSave('-               MOVIE INFO             -');
            consoleAndSave('----------------------------------------\n');
            consoleAndSave('Title:                 ' + response.data.Title);
            consoleAndSave('Release Year:          ' + response.data.Year);

            // Confirm if the movie has IMDB rating
            if (response.data.Ratings[0].Source === 'Internet Movie Database') {
                consoleAndSave('IMDB rating:           ' + response.data.Ratings[0].Value);
            };

            // Confirm if the movie has Rotten Tomatoes rating
            if (response.data.Ratings[1].Source === 'Rotten Tomatoes') {
                consoleAndSave('Roten Tomatoes rating: ' + response.data.Ratings[1].Value);
            };

            consoleAndSave('Country:               ' + response.data.Country);
            consoleAndSave('Language:              ' + response.data.Language);
            consoleAndSave('Plot:                  ' + response.data.Plot);
            consoleAndSave('Actors:                ' + response.data.Actors);
        }
    );
};

// Follow the action in a text file
function doWhatIsay(file) {

    // Read the 'random.txt' file
    fs.readFile(file, "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        // Clear the value of argument
        argument = '';

        // Loop Through the newly created output array
        for (var i = 1; i < output.length; i++) {

            // Build the argument variable with the info in the file
            argument += output[i];
        }

        // Send the new action to the initial switch
        welcome(output[0]);
    });
}

// First function to run
function welcome(action) {

    // First step is to define what is the user request
    switch (action) {
        // concert-this '<artist/band name here>'
        case 'concert-this':
            getConcertInfo();
            break;

            // spotify-this-song '<song name here>'
        case 'spotify-this-song':
            getSongInfo();
            break;

            // movie-this '<movie name here>'
        case 'movie-this':
            getMovieInfo();
            break;

            // do-what-it-says
        case 'do-what-it-says':
            doWhatIsay('random.txt');
            break;

        default:
            console.log('You REALLY need to tell me what to do!')
            break;
    };

};

welcome(action);