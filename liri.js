////// INCLUDING PACKAGES //////

// Includes the FS package for reading and writing packages
const fs = require("fs");

// Include the axios npm package to manage the API calls
const axios = require("axios");

const Spotify = require('node-spotify-api');

// require("dotenv").config();


////// VARIABLES //////

//      CONSTANTS


//      ARRAYS


//      STRINGS/CHAR
var action = process.argv[2]; // Action requested by used
var argument = process.argv[3]; // Argument provided to process the user request


//      NUMBER/INTEGER


//      BOOLEAN


//      OBJECTS

//var spotify = new Spotify(keys.spotify); // Spotify key

///////////////// SPOTIFY /////////////////
// Client ID:     7c03e03564d04d528e06456c6b6c5137
// Client Secret: 287bb704c758427b86f82b4711cc68df
//////////////////////////////

// Get the info of a song
function getSonfInfo() {

    var spotify = new Spotify({
        id: '7c03e03564d04d528e06456c6b6c5137',
        secret: '287bb704c758427b86f82b4711cc68df'
    });

    var song = argument;

    var params = {
        type: 'track',
        query: song
    };

    var querySpotify = 'https://api.spotify.com/v1/search?q=name:' + song + '&type=track&limit=10';

    console.log('xxx: ' + querySpotify);

    spotify
        .request(querySpotify)

        .then(function (data) {

            // console.log(data);
            // console.log('Song Details: ', data.tracks);

            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

};

// Get the info of a movie
function getMovieInfo() {

    if (!argument) { // If there is no movie provided default into 'Mr. Nobody'
        argument = 'Mr. Nobody';
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

            console.log(queryUrl);

            // Log all the info
            console.log('');
            console.log('----------------------');
            console.log('-     MOVIE INFO     -');
            console.log('----------------------');
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
            getSonfInfo();
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