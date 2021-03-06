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


// Get concert infomration on an artist/band
function getConcertInfo() {

    if (!argument) { // If no band/artist provided default into 'The Who'
        argument = 'The Who';
    };

    // Set the argment to 'band'
    var band = argument;

    // Replace spaces for ASCI equivalent '%20'
    band = band.replace(' ', '%20').toLowerCase();

    //console.log(band);

    // Build the query URL based on the title provided
    var queryUrl = 'https://rest.bandsintown.com/artists/' + band + '/events?app_id=codingbootcamp';

    // Run a request with axios to the OMDB API
    axios.get(queryUrl).then(
        function (response) {

            //Print the info requested
            console.log('\n----------------------------------------');
            console.log('-             CONCERT INFO             -');
            console.log('----------------------------------------');
            console.log('Artist: ' + argument);
            console.log('----------------------------------------\n');
            for (const key in response.data) {
                console.log(' (' + (parseInt(key) + 1) + ')');
                console.log(response.data[key].venue.name);
                console.log(response.data[key].venue.city + ', ' + response.data[0].venue.region + ' (' + response.data[0].venue.country + ')');
                console.log(dateFormat(response.data[key].datetime, "mm/dd/yyyy"));
                console.log('----------------------------------------');
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
        console.log('\n----------------------------------------');
        console.log('-               SONG INFO              -');
        console.log('----------------------------------------\n');
        console.log('  Artist:     ' + data.tracks.items[0].artists[0].name);
        console.log('  Song name:  ' + data.tracks.items[0].name);
        console.log('  Prieview:   ' + data.tracks.items[0].preview_url);
        console.log('  Album name: ' + data.tracks.items[0].album.name);

    });
};

// Get the info of a movie
function getMovieInfo() {

    if (!argument) { // If there is no movie provided default into 'Mr. Nobody'
        argument = 'Mr Nobody';
    };

    // Replace spaces for ASCI equivalent '%20'
    argument = argument.replace(' ', '%20').toLowerCase();

    //console.log(argument);

    // Build the query URL based on the title provided
    var queryUrl = 'http://www.omdbapi.com/?t=' + argument + '&y=&plot=short&apikey=trilogy';

    // Run a request with axios to the OMDB API
    axios.get(queryUrl).then(
        function (response) {
            // Clear the console
            // console.log('\033[2J');

            //console.log(queryUrl);

            //Print the info requested
            console.log('\n----------------------------------------');
            console.log('-               MOVIE INFO             -');
            console.log('----------------------------------------\n');
            console.log('Title:                 ' + response.data.Title);
            console.log('Release Year:          ' + response.data.Year);

            // Confirm if the movie has IMDB rating
            if (response.data.Ratings[0].Source === 'Internet Movie Database') {
                console.log('IMDB rating:           ' + response.data.Ratings[0].Value);
            };

            // Confirm if the movie has Rotten Tomatoes rating
            if (response.data.Ratings[1].Source === 'Rotten Tomatoes') {
                console.log('Roten Tomatoes rating: ' + response.data.Ratings[1].Value);
            };

            console.log('Country:               ' + response.data.Country);
            console.log('Language:              ' + response.data.Language);
            console.log('Plot:                  ' + response.data.Plot);
            console.log('Actors:                ' + response.data.Actors);
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